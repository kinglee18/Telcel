import { Injectable } from "@angular/core";
import { of, Subject } from "rxjs";
import { Branch } from "./branch";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root"
})
export class CustomerCareService {
  private missionAnnouncedSource = new Subject<Array<Branch>>();
  private dateRange = new Subject<object>();

  constructor(private httpClient: HttpClient) {}

  branchesChanged$ = this.missionAnnouncedSource.asObservable();

  getCenters() {
    return this.httpClient.get(environment.api + 'centers');
  }

  selectBranches(branches: Array<Branch>) {
    this.missionAnnouncedSource.next(branches);
  }

  setDateRange(range: object) {
    this.dateRange.next(range);
  }
}
