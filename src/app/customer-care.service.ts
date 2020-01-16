import { Injectable } from "@angular/core";
import { of, Subject } from "rxjs";
import { Branch } from "./branch";

@Injectable({
  providedIn: "root"
})
export class CustomerCareService {
  private missionAnnouncedSource = new Subject<Array<Branch>>();
  private dateRange = new Subject<object>();

  constructor() {}

  branchesChanged$ = this.missionAnnouncedSource.asObservable();

  getCenters() {
    return of([{ name: "Tabasco cac", id: 2 }]);
  }

  selectBranches(branches: Array<Branch>) {
    this.missionAnnouncedSource.next(branches);
  }

  setDateRange(range: object) {
    this.dateRange.next(range);
  }
}
