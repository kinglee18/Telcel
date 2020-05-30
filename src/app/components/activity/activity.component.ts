import { Component, OnInit } from "@angular/core";
import { CommentsService } from "../../services/comments.service";
import { CustomerCareService } from "../../services/customer-care.service";
import { GeneralBoard } from "../general-board";
import { Board } from "../../board";

@Component({
  selector: "app-activity",
  templateUrl: "./activity.component.html",
  styleUrls: ["./activity.component.scss"]
})
export class ActivityComponent extends GeneralBoard implements Board {
  monthlyReviews: Array<object> = [];
  languages: Array<object> = [];
  otherLanguages: Array<object> = [];

  constructor(
    private commentsService: CommentsService,
    customerService: CustomerCareService
  ) {
    super(customerService);
  }

  showBoardInfo(centers, date) {
    console.log(this.centers);
    
    this.request = this.commentsService.getMonthlyLanguageComments(centers, date).subscribe(data => {
      this.monthlyReviews = data["monthly_comments"];
      this.otherLanguages = data["other_languages"];
      this.languages = data["languages"];
      this.loading = false;
    });
  }
}
