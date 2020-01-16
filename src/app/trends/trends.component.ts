import { Component, OnInit } from "@angular/core";
import { CustomerCareService } from "../customer-care.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-trends",
  templateUrl: "./trends.component.html",
  styleUrls: ["./trends.component.scss"]
})
export class TrendsComponent implements OnInit {
  averageSentiment = [
    [8, 12, 9],
    [4, 5.5, 9],
    [11, 14, 9],
    [4, 5, 9],
    [3, 3.5, 9],
    [6.5, 7, 9]
  ];
  options = {
    series: {
      0: { axis: "hours studied" },
      1: { axis: "final grade" }
    }
  };
  subscription: Subscription;
  constructor(private customerService: CustomerCareService) {
    this.subscription = customerService.branchesChanged$.subscribe(mission => {
      console.log(mission);
    });
  }

  ngOnInit() {}
}
