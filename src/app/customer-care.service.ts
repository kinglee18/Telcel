import { Injectable } from "@angular/core";
import { of, Subject, Observable, ReplaySubject } from "rxjs";
import { Branch } from "./branch";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class CustomerCareService {
  private branchesupdated = new ReplaySubject<Array<Branch>>();
  branchesChanged$ = this.branchesupdated.asObservable();
  private dateRange;

  constructor(private httpClient: HttpClient) {}

  getCenters(date?: any): Promise<any> {
    return this.httpClient.get(environment.api + "centers").toPromise();
  }

  selectBranches(branches: Array<Branch>) {
    this.branchesupdated.next(branches);
  }

  setDateRange(range: object) {
    this.dateRange = range;
  }

  getDate() {
    return this.dateRange;
  }
}
