import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { Branch } from "./branch";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import * as moment from "moment";

@Injectable({
  providedIn: "root"
})
export class CustomerCareService {
  private branchesupdated = new ReplaySubject<string>(1);
  private dateRange;
  branchesChanged$ = this.branchesupdated.asObservable();

  constructor(private httpClient: HttpClient) {}

  getCenters(): Promise<object> {
    return this.httpClient
      .get(environment.api + "centers", {
        params: {
          date_init: this.getDate().begin,
          date_end: this.getDate().end
        }
      })
      .toPromise();
  }

  selectBranches(branches: Array<Branch>): void {
    this.branchesupdated.next(
      branches.map(ele => {
        return ele.id;
      }).join(',')
    );
  }

  setDateRange(range: any): void {
    const newDate = {
      begin: moment(range.begin).format("DD/MM/YYYY"),
      end: moment(range.end).format("DD/MM/YYYY")
    };
    this.dateRange = newDate;
  }

  getDate(): any {
    return this.dateRange;
  }
}
