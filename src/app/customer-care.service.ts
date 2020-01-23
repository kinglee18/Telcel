import { Injectable } from "@angular/core";
import { of, Subject, Observable } from "rxjs";
import { Branch } from "./branch";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class CustomerCareService {
  private branchesupdated = new Subject<Array<Branch>>();
  private dateRange 
  constructor(private httpClient: HttpClient) {}
  request: Observable<any>;
  branchesChanged$ = this.branchesupdated.asObservable();

  private branches: Array<Branch> = [];

  getCenters(date?: any): Promise<Array<Branch>> {
    return new Promise((resolve, reject) => {
      if (date) {
        this.request = this.httpClient.get(environment.api + "centers");
        this.request.subscribe(data => {
          this.branches = data;
          resolve(this.branches);
        });
      } else {
        resolve(this.branches);
      }
    });
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
