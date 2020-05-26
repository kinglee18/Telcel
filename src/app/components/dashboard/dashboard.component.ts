import { Component, ViewChild, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ReplaySubject, Subject } from "rxjs";
import { MatSelect } from "@angular/material";
import { take, takeUntil, debounceTime, filter } from "rxjs/operators";

import * as moment from "moment";
import { CustomerCareService } from "../../services/customer-care.service";
import { Branch } from "../../branch";
import { AuthService } from "../../services/auth.service";
import { Router, NavigationEnd } from "@angular/router";
declare var KTLayout: any;

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnDestroy {
  maxDate = new Date();
  branches: Branch[] = [];
  public branchMultiCtrl: FormControl = new FormControl();
  public dateRange: FormControl = new FormControl(moment());
  public branchMultiFilterCtrl: FormControl = new FormControl();
  public filteredBranches: ReplaySubject<Branch[]> = new ReplaySubject<
    Branch[]
  >(1);
  toggleAllCheckboxChecked = false;
  protected _onDestroy = new Subject<void>();
  @ViewChild("multiSelect", { static: true }) multiSelect: MatSelect;
  private allCenters: boolean;

  /**
   * @description - set all subscriptions to listen for events in DOM and
   * retrieves branches from server
   */
  constructor(
    private customerService: CustomerCareService,
    private authService: AuthService,
    private router: Router
  ) {

    this.verifyRoute();
    this.dateRange.valueChanges.subscribe(date => {
      this.customerService.saveDateRange(date);
      this.requestBranches();
    });
    this.setDefaultDate();

    this.branchMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBranchesMulti();
      });
    this.branchMultiCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy), debounceTime(200))
      .subscribe((data: Array<any>) => {
        this.customerService.selectBranches(data);
        this.toggleAllCheckboxChecked =
          this.branchMultiCtrl.value.length === this.branches.length;
      });
  }

  /**
   * @description - set the default date form date range selector
   */
  setDefaultDate(): void {
    this.dateRange.setValue({
      begin: moment()
        .subtract(3, "M")
        .toISOString(),
      end: moment().toISOString()
    });
  }
  /**
   * @description - destroy all current subscriptions created to prevent memory leaks
   */
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /**
   *
   * @param selectAllValue - checkbox value
   * @description - disable or enable all the branches in select input
   */
  toggleBranches(selectAllValue: boolean) {
    this.toggleAllCheckboxChecked = selectAllValue;
    this.filteredBranches
      .pipe(take(1))
      .subscribe(val => {
        if (selectAllValue) {
          this.branchMultiCtrl.patchValue(val);
        } else {
          this.branchMultiCtrl.patchValue([]);
        }
      });
  }

  /**
   *
   * @param $event - js click event
   * @param branch - selected branch
   * @description - disable all active branches and enable the selected one
   */
  branchSingleSelection($event: any, branch): void {
    $event.stopPropagation();
    this.branchMultiCtrl.patchValue([branch]);
  }

  /**
   * @description - filters the branches list according to the user input
   */
  protected filterBranchesMulti() {
    if (!this.branches) {
      return;
    }
    let search = this.branchMultiFilterCtrl.value;
    if (!search) {
      this.filteredBranches.next(this.branches.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredBranches.next(
      this.branches.filter(
        branch => branch.name.toLowerCase().indexOf(search) > -1
      )
    );
  }

  /**
   * @description - close user current session in applpication
   */
  closeSession() {
    this.authService.logout().subscribe(
      data => {
        this.router.navigate(["/login"]);
      }
    );
  }

  /**
   * @description - triggers jquery onDocumentReady function to enable dom effects
   */
  ngAfterViewInit() {
    setTimeout(() => {
      KTLayout.init();
    }, 300);
  }

  verifyRoute() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(takeUntil(this._onDestroy))
      .subscribe((val: NavigationEnd) => {
        const state = val.url === '/coments-reply';
        if (state !== this.allCenters) {
          this.allCenters = state;

          this.requestBranches();
        }
        this.allCenters = state;
      });
  }

  requestBranches() {
    this.customerService
      .getCenters(this.allCenters)
      .then((centers: Array<any>) => {
        this.branches = centers;
        this.filteredBranches.next(centers.slice());
        this.toggleBranches(true);
      });
  }
}
