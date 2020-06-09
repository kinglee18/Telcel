
import { ReplaySubject } from 'rxjs';

export class CustomerCareServiceStub {
  private branchesupdated = new ReplaySubject<string>(1);
  branchesChanged$ = this.branchesupdated.asObservable();
}
