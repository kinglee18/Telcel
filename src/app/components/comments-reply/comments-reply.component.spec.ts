import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsReplyComponent } from './comments-reply.component';
import { CustomMaterialModule } from 'src/app/material.module';
import { CustomerCareService } from 'src/app/services/customer-care.service';
import { CommentsService } from 'src/app/services/comments.service';
import { CommentsServiceStub } from '../review-dialog/review-dialog.component.spec';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject, Observable } from 'rxjs';

export class CustomerCareServiceStub {
  branches$ = new BehaviorSubject([]);
  branchesChanged$ = new Observable();
  getCenters(){}
}
describe('CommentsReplyComponent', () => {
  let component: CommentsReplyComponent;
  let fixture: ComponentFixture<CommentsReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommentsReplyComponent],
      imports: [CustomMaterialModule, BrowserAnimationsModule],
      providers: [
        { provide: CustomerCareService, useValue: new CustomerCareServiceStub() },
        { provide: CommentsService, useValue: new CommentsServiceStub() }

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
