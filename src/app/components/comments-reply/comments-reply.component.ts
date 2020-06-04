import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { MatDialog, MatSnackBar, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ReviewDialogComponent } from '../review-dialog/review-dialog.component';
import { GeneralBoard } from '../general-board';
import { CustomerCareService } from '../../services/customer-care.service';
import { CommentsService } from '../../services/comments.service';
import * as moment from "moment";
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-comments-reply',
  templateUrl: './comments-reply.component.html',
  styleUrls: ['./comments-reply.component.scss']
})
export class CommentsReplyComponent extends GeneralBoard implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource = new MatTableDataSource();

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    customerService: CustomerCareService,
    private commentsService: CommentsService
  ) {
    super(customerService);
  }


  ngOnInit(){

  }
  ngAfterViewInit() {
    this.customerService.getCenters(true);
    super.ngOnInit();
  }

  ngOnDestroy() {
    this.customerService.getCenters();
    
  }
  /**
   * @param centers - selected branches in dashboard
   * @param date - selected date range in dashboard
   * @description - makes a request to retrieve all keywords
   */
  showBoardInfo(centers, date) {
    this.commentsService
      .getAllComments(this.centers, date)
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
      });
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
