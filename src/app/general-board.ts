import { Subscription } from "rxjs";
import { CustomerCareService } from "./customer-care.service";
import { Board } from "./board";
import { AfterViewInit, OnDestroy } from "@angular/core";

export class GeneralBoard implements Board, AfterViewInit, OnDestroy {
  subscription: Subscription;
  request: Subscription;
  loading = true;
  centers: Array<any>;
  
  constructor(protected customerService: CustomerCareService) {}

  ngAfterViewInit() {
    this.subscription = this.customerService.branchesChanged$.subscribe(
      centers => {
        this.centers = centers;
        this.loading = true;
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
