import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { CommentsService } from "../comments.service";

@Component({
  selector: "app-review-dialog",
  templateUrl: "./review-dialog.component.html",
  styleUrls: ["./review-dialog.component.scss"]
})
export class ReviewDialogComponent {
  review: any;
  model: any = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commentsService: CommentsService,
    private dialogRef: MatDialogRef<ReviewDialogComponent>
  ) {
    this.review = this.data.review;
    this.model.answer = this.data.review['reply'];
  }

  submitReply() {
    this.commentsService
      .replyReview(this.data.review.reviewId, this.model.answer)
      .subscribe(
        data => {
          this.data.review.reply = this.model.answer;
          this.dialogRef.close(this.data.review);
        },
        error => {
          alert("No es posible realizar esta accion en este momento");
        }
      );
  }
}
