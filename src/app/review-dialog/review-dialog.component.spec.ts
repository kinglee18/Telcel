import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ReviewDialogComponent } from "./review-dialog.component";
import { FormsModule } from "@angular/forms";
import { CustomMaterialModule } from "../material.module";
import { CommentsService } from "../comments.service";

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { of } from 'rxjs';

export class CommentsServiceStub{
  replyReview(id, comment){return of({})}
}

describe("ReviewDialogComponent", () => {
  let component: ReviewDialogComponent;
  let fixture: ComponentFixture<ReviewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewDialogComponent],
      imports: [FormsModule, CustomMaterialModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {review:{id:2}} },
        { provide: CommentsService, useValue: CommentsServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should enable form and submit data", () => {
    const answerEl = fixture.debugElement.nativeElement.querySelector('#answer');
    answerEl.value = "Comentario de evaluacion";
    answerEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const submitBtn = fixture.debugElement.nativeElement.querySelector('#submit');
    submitBtn.dispatchEvent(new Event('click'));
    expect(submitBtn.disabled).toBeFalsy();
    
  });
});
