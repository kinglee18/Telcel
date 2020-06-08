import { Component, ViewChild, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ReplaySubject, Subject } from "rxjs";
import { MatSelect } from "@angular/material";
import { take, takeUntil, debounceTime, filter } from "rxjs/operators";

import * as moment from "moment";
import { CustomerCareService } from "../../services/customer-care.service";
import { Branch } from "../../branch";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

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


  /**
   * @description - set all subscriptions to listen for events in DOM and
   * retrieves branches from server
   */
  constructor(
    private customerService: CustomerCareService,
    private authService: AuthService,
    private router: Router
  ) {

    this.customerService.branches$.subscribe(data => {
      this.branches = data;
      this.filteredBranches.next(data.slice());
      this.toggleBranches(true);
    });

    this.dateRange.valueChanges.subscribe(date => {
      this.customerService.saveDateRange(date);
      this.customerService.getCenters();
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
    this.redirect();
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
    /*     setTimeout(() => {
          KTLayout.init();
        }, 300); */
  }

  redirect() {
    if (this.router.url === '/') {
      this.authService.getUserPermissions();

      const routes = [
        { route: '/activity', permission: 'actividad_respuestas' },
        { route: '/administration/users', permission: 'listar_usuarios' },
      ];
      for (const item of routes) {
        if (this.authService.getUserPermissions().indexOf(item.permission) > -1) {
          this.router.navigate([item.route]);
          break;
        }
      }
    }
  }
}
