import { Subscription } from "rxjs";
import { CustomerCareService } from "./customer-care.service";
import { Board } from "./board";

export class GeneralBoard implements Board {
  subscription: Subscription;
  request: Subscription;

  constructor(protected customerService: CustomerCareService) {}

  ngAfterViewInit() {
    this.customerService.getCenters().then(data => {
      if (data.length) {
        this.showBoardInfo(data, this.customerService.getDate());
      }
    });
    this.subscription = this.customerService.branchesChanged$.subscribe(
      centers => {
        this.showBoardInfo(centers, this.customerService.getDate());
      }
    );
  }
  showBoardInfo(centers, date) {
    throw new Error("Method not implemented.");
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.request.unsubscribe();
  }
}
