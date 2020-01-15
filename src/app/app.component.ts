import { Component, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ReplaySubject, Subject } from "rxjs";
import { MatSelect } from "@angular/material";
import { take, takeUntil } from "rxjs/operators";
import { CustomerCareService } from "./customer-care.service";
export interface Branch {
  id: string;
  name: string;
}
export const BRANCHES: Branch[] = [
  { name: "Branch A (Switzerland)", id: "A" },
  { name: "Branch B (Switzerland)", id: "B" },
  { name: "Branch C (France)", id: "C" },
  { name: "Branch D (France)", id: "D" },
  { name: "Branch E (France)", id: "E" }
];
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  protected branches: Branch[] = BRANCHES;

  /** control for the selected branch for multi-selection */
  public branchMultiCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword multi-selection */
  public branchMultiFilterCtrl: FormControl = new FormControl();

  /** list of branches filtered by search keyword */
  public filteredBranchesMulti: ReplaySubject<Branch[]> = new ReplaySubject<
    Branch[]
  >(1);

  @ViewChild("multiSelect", { static: true }) multiSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  constructor(private customerService: CustomerCareService) {}

  ngOnInit() {
    this.customerService.getCenters().subscribe(data => {
      console.log(data);
    });
    this.branchMultiCtrl.setValue([
      this.branches[10],
      this.branches[11],
      this.branches[12]
    ]);

    this.filteredBranchesMulti.next(this.branches.slice());

    this.branchMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBranchesMulti();
      });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  toggleSelectAll(selectAllValue: boolean) {
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
   * Sets the initial value after the filteredBranches are loaded initially
   */
  protected setInitialValue() {
    this.filteredBranchesMulti
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.multiSelect.compareWith = (a: Branch, b: Branch) =>
          a && b && a.id === b.id;
      });
  }

  protected filterBranchesMulti() {
    if (!this.branches) {
      return;
    }
    // get the search keyword
    let search = this.branchMultiFilterCtrl.value;
    if (!search) {
      this.filteredBranchesMulti.next(this.branches.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the branches
    this.filteredBranchesMulti.next(
      this.branches.filter(
        branch => branch.name.toLowerCase().indexOf(search) > -1
      )
    );
  }
}
