import { Component, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ReplaySubject, Subject } from "rxjs";
import { MatSelect } from "@angular/material";
import { take, takeUntil, debounceTime } from "rxjs/operators";

import * as moment from "moment";
import { CustomerCareService } from '../customer-care.service';
import { Branch } from '../branch';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent {
  constructor(private customerService: CustomerCareService) {}
  protected branches: Branch[] = [];
  public branchMultiCtrl: FormControl = new FormControl();
  public dateRange: FormControl = new FormControl(moment());
  public branchMultiFilterCtrl: FormControl = new FormControl();
  public filteredBranchesMulti: ReplaySubject<Branch[]> = new ReplaySubject<
    Branch[]
  >(1);
  private toggleAllCheckboxChecked = false;
  protected _onDestroy = new Subject<void>();
  @ViewChild("multiSelect", { static: true }) multiSelect: MatSelect;

  ngOnInit() {
    this.dateRange.valueChanges.subscribe(date => {
      this.customerService.setDateRange(date);
      this.customerService
        .getCenters()
        .then((centers: Array<any>) => {
          this.branches = centers;
          this.filteredBranchesMulti.next(centers.slice());
          this.toggleSelectAll(true);
        })
        .catch(err => {
          alert("No es posible consultar la información en este momento");
        });
    });
    this.dateRange.setValue({
      begin: moment()
        .subtract(3, "M")
        .toISOString(),
      end: moment().toISOString()
    });
    this.branchMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBranchesMulti();
      });
    this.branchMultiCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy), debounceTime (200))
      .subscribe((data: Array<any>) => {
        this.customerService.selectBranches(data);
        this.toggleAllCheckboxChecked =
          this.branchMultiCtrl.value.length === this.branches.length;
      });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  toggleSelectAll(selectAllValue: boolean) {
    this.toggleAllCheckboxChecked = selectAllValue;
    this.filteredBranchesMulti
      .pipe(take(1), takeUntil(this._onDestroy))
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
   * @param $event
   * @param center
   */
  selectOnlyOne($event: any, center) {
    $event.stopPropagation();
    this.toggleSelectAll(false);
    this.branchMultiCtrl.patchValue([center]);
  }

  protected filterBranchesMulti() {
    if (!this.branches) {
      return;
    }
    let search = this.branchMultiFilterCtrl.value;
    if (!search) {
      this.filteredBranchesMulti.next(this.branches.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredBranchesMulti.next(
      this.branches.filter(
        branch => branch.name.toLowerCase().indexOf(search) > -1
      )
    );
  }
}
