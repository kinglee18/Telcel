import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { CommentsService } from '../comments.service';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.scss']
})
export class ReviewDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private commentsService: CommentsService) {}
  model: any = {};
  ngOnInit() {
    console.log(this.data);
    
  }

  submitReply() {
    console.log(this.model);
    
    this.commentsService.replyReview(this.data.review.id, null
      );
  }
}
