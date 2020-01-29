import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { GeneralBoard } from "../general-board";
import { Board } from "../board";
import { CustomerCareService } from "../customer-care.service";
import { CommentsService } from "../comments.service";

@Component({
  selector: "app-entities-sentiment",
  templateUrl: "./entities-sentiment.component.html",
  styleUrls: ["./entities-sentiment.component.scss"]
})
export class EntitiesSentimentComponent extends GeneralBoard implements Board {
  constructor(
    customerService: CustomerCareService,
    private commentsService: CommentsService
  ) {
    super(customerService);
  }
  scoreByMention = [];
  averages = [];

  showBoardInfo(centers, date) {}

  selectedEntity(selected: any) {
    this.commentsService
      .getEntitiesScores(selected.centers, selected.date, selected.entity)
      .subscribe((data: any) => {
        this.scoreByMention = data.scoreByMention;
        this.averages = data.averages;
      });
  }
}
