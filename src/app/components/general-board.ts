import { Subscription } from "rxjs";
import { CustomerCareService } from "../services/customer-care.service";
import { Board } from "../board";
import { AfterViewInit, OnDestroy, OnInit } from "@angular/core";

export class GeneralBoard implements Board, OnInit, OnDestroy {
  subscription: Subscription;
  request: Subscription;
  loading = true;
  centers: string;

  constructor(protected customerService: CustomerCareService) { }

  /**
   * @description - listnes to the branches selector and set some variables 
   * to inherit to its child clases
   */
  ngOnInit() {
    console.log(8);
    
    this.subscription = this.customerService.branchesChanged$.subscribe(
      centers => {
        this.centers = centers;
        if (centers.length) {
          this.loading = true;
          this.showBoardInfo(centers, this.customerService.getDate());
        }
      }
    );
  }

  /**
   * 
   * @param centers - selected branches in the dashboard
   * @param date - selected date in the dashboard
   */
  showBoardInfo(centers, date) {
    throw new Error("Method not implemented.");
  }

  /**
   * @description prevents memory leaks
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.request) {
      this.request.unsubscribe();
    }
  }
}
