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

  /**
   * @description - request all branches from server according to the submitted date range
   */
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

  /**
   *
   * @param branches - a list of the provided branches in selection input
   * @description - update the branches in the observable to make then
   * available from any component
   */
  selectBranches(branches: Array<Branch>): void {
    this.branchesupdated.next(
      branches.map(ele => {
        return ele.id;
      }).join(',')
    );
  }

  /**
   *
   * @param range - date range from the selection input
   * @description - transform the selected input into an object with moment format
   */
  setDateRange(range: any): void {
    const newDate = {
      begin: moment(range.begin).format("DD/MM/YYYY"),
      end: moment(range.end).format("DD/MM/YYYY")
    };
    this.dateRange = newDate;
  }

  /**
   * @return selected date with moment format
   */
  getDate(): any {
    return this.dateRange;
  }
}
