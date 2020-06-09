import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { GeneralBoard } from "../general-board";
import { Board } from "../../board";
import { CustomerCareService } from "../../services/customer-care.service";
import { CommentsService } from "../../services/comments.service";
import { take } from 'rxjs/operators';

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
  chartsLoading = true;
  entities: Array<any> = [];

  showBoardInfo(centers, date) {
    this.chartsLoading = true;
    this.request = this.commentsService
    .getEntites(centers, this.customerService.getDate())
    .subscribe(entities => {
      this.loading = false;
      this.entities = entities["entities"];
    });
  }

  selectedEntity(selected: any) {
    this.chartsLoading = true;
    this.commentsService
      .getEntitiesScores(this.centers, selected.date, selected.entity)
      .pipe(take(1))
      .subscribe((data: any) => {
        this.scoreByMention = data['score_and_mentions'];
        this.averages = data['score_by_time'];
        this.chartsLoading = false;
      });
  }
}
