import { Component, OnInit, ViewChild } from "@angular/core";
import { GeneralBoard } from "../general-board";
import { CustomerCareService } from "../customer-care.service";
import { CommentsService } from "../comments.service";
import {
  MatTableDataSource,
  MatPaginator,
  MatDialog,
  MatSort,
  MatSnackBar
} from "@angular/material";
import { ReviewDialogComponent } from "../review-dialog/review-dialog.component";

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
    private commentsService: CommentsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
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

  selectedEntity({ date, entity, entityName }) {
    this.entityName = entityName;
    this.commentsLoader = true;
    this.commentsService
      .getComments(this.centers, date, entity)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.commentsLoader = false;
      });
  }

  highlightComment(comment: string): string {
    if (!this.entityName) {
      return comment;
    }
    const position = this.normalizedComment(comment).search(
      this.normalizedComment(this.entityName)
    );
    return position > -1
      ? `${comment.slice(0, position)}<b>${comment.slice(
          position,
          position + this.entityName.length
        )}</b>${comment.slice(
          position + this.entityName.length,
          comment.length
        )}`
      : comment;
  }

  normalizedComment(comment: string): string {
    return comment
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  openDialog(review) {
    this.dialog
      .open(ReviewDialogComponent, {
        data: { review }
      })
      .afterClosed()
      .subscribe(comment => {
        if (comment) {
          this.snackBar.open("El comentario ha sido respondido", null, {
            duration: 2000
          });
        }
      });
  }
}
