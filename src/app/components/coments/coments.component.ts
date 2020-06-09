import { Component, OnInit, ViewChild } from "@angular/core";
import { GeneralBoard } from "../general-board";
import { CustomerCareService } from "../../services/customer-care.service";
import { CommentsService } from "../../services/comments.service";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatSnackBar
} from "@angular/material";
import * as moment from "moment";
import { take } from 'rxjs/operators';

@Component({
  selector: "app-coments",
  templateUrl: "./coments.component.html",
  styleUrls: ["./coments.component.scss"]
})
export class ComentsComponent extends GeneralBoard {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  commentsLoader = true;
  entities: Array<any> = [];
  entityName: string;
  dataSource = new MatTableDataSource();

  constructor(
    customerService: CustomerCareService,
    private commentsService: CommentsService) {
    super(customerService);
  }

  /**
   * @param centers - selected branches in dashboard
   * @param date - selected date range in dashboard
   * @description - makes a request to retrieve all keywords
   */
  showBoardInfo(centers, date) {
    this.commentsLoader = true;
    this.commentsService
      .getEntitiesByComments(centers, date)
      .pipe(take(1))
      .subscribe(data => {
        this.loading = false;
        this.entities = data["entities"];
      });
  }

  /**
   *
   * @param date - date selected in dashboard
   * @param entity - selected word in box container
   * @description receives the event when a keyword is selected
   * and request comments related to the word
   */
  selectedEntity({ date, entity }) {
    if (entity) {
      this.entityName = entity.name;
    }
    this.commentsLoader = true;
    this.commentsService
      .getComments(this.centers, date, entity)
      .pipe(take(1))
      .subscribe(data => {
        data.map(element => {
          moment.locale('es');
          element.date = moment(element.date).format('DD/MMM/YYYY');
          return element;
        });
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.commentsLoader = false;
      });
  }

  /**
   *
   * @param comment - comment displayed in table
   * @description inserts a bold tag into the comment to highlight the text 
   * according to the selected keyword or the complete keyword list if single
   *  keyword is not selected
   */
  highlightComment(comment: string): string {
    const entityList = this.entityName
      ? [this.entityName]
      : this.entities.map(el => {
        return el.name;
      });
    for (const keyword of entityList) {
      const position = this.normalizedComment(comment).search(
        this.normalizedComment(keyword)
      );
      if (position > -1) {
        return `${comment.slice(0, position)}<b>${comment.slice(
          position,
          position + keyword.length
        )}</b>${comment.slice(position + keyword.length, comment.length)}`;
      }
    }
    return comment;
  }

  /**
   * 
   * @param comment - comment from the table
   * @description - removes returns an unicode text for text comparison
   */
  normalizedComment(comment: string): string {
    return comment
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }
}
