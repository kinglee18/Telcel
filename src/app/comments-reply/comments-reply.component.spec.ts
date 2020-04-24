import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsReplyComponent } from './comments-reply.component';

describe('CommentsReplyComponent', () => {
  let component: CommentsReplyComponent;
  let fixture: ComponentFixture<CommentsReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentsReplyComponent ]
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
