import { Subscription } from "rxjs";
import { CustomerCareService } from "./customer-care.service";

export class GeneralBoard {
  subscription: Subscription;

  constructor(private customerService: CustomerCareService) {
    this.subscription = customerService.branchesChanged$.subscribe(mission => {
    });
  }
}
