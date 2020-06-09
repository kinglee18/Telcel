import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TrendsComponent } from "./trends.component";
import { GoogleChartsModule } from "angular-google-charts";
import { CustomerCareServiceStub } from "../../app.component.spec";
import { LoadingStubDirective, commentsServiceStub } from "../activity/activity.component.spec";

import { NO_ERRORS_SCHEMA } from "@angular/core";
import { CommentsService } from '../../services/comments.service';
import { CustomerCareService } from '../../services/customer-care.service';

describe("TrendsComponent", () => {
  let component: TrendsComponent;
  let fixture: ComponentFixture<TrendsComponent>;

  beforeEach(async(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TrendsComponent, LoadingStubDirective],
      imports: [GoogleChartsModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: CommentsService,
          useValue: new commentsServiceStub()
        },
        {
          provide: CustomerCareService,
          useValue: new CustomerCareServiceStub()
        }
      ]
    }).createComponent(TrendsComponent);
    component = fixture.componentInstance;
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
