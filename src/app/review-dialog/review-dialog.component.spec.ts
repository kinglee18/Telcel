import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ReviewDialogComponent } from "./review-dialog.component";
import { FormsModule } from "@angular/forms";
import { CustomMaterialModule } from "../material.module";
import { CommentsService } from "../comments.service";
import { commentsServiceStub } from "../activity/activity.component.spec";
import { MAT_DIALOG_DATA } from "@angular/material";
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe("ReviewDialogComponent", () => {
  let component: ReviewDialogComponent;
  let fixture: ComponentFixture<ReviewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewDialogComponent],
      imports: [FormsModule, CustomMaterialModule],

      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: CommentsService, useValue: commentsServiceStub }
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
});
