import { Component, OnInit } from "@angular/core";
import { GeneralBoard } from "../general-board";
import { CustomerCareService } from "../customer-care.service";
import { CommentsService } from "../comments.service";
import { MatTableDataSource } from "@angular/material";
@Component({
  selector: "app-coments",
  templateUrl: "./coments.component.html",
  styleUrls: ["./coments.component.scss"]
})
export class ComentsComponent extends GeneralBoard {
  commentsLoader = true;
  entities: Array<any> = [];
  dataSource = new MatTableDataSource([]);

  constructor(
    customerService: CustomerCareService,
    private commentsService: CommentsService
  ) {
    super(customerService);
  }

  showBoardInfo(centers, date) {
    this.commentsLoader = true;
    this.request = this.commentsService
      .getEntitiesByComments(centers, date)
      .subscribe(data => {
        this.loading = false;
        this.entities = data["entities"];
      });
  }

  selectedEntity({ date, entity }) {
    this.commentsLoader = true;
    this.commentsService
      .getComments(this.centers, date, entity)
      .subscribe(data => {
        this.dataSource = data;
        this.commentsLoader = false;
      });
  }
}
