import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { EntitiesSentimentComponent } from "./entities-sentiment.component";
import { GoogleChartsModule } from "angular-google-charts";
import { ReactiveFormsModule } from "@angular/forms";
import { CustomMaterialModule } from "../material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { LoadingStubDirective, commentsServiceStub } from "../activity/activity.component.spec";
import { CommentsService } from '../comments.service';
import { CustomerCareService } from '../customer-care.service';
import { CustomerCareServiceStub } from '../app.component.spec';

describe("EntitiesSentimentComponent", () => {
  let component: EntitiesSentimentComponent;
  let fixture: ComponentFixture<EntitiesSentimentComponent>;

  beforeEach(async(() => {
    fixture = TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [EntitiesSentimentComponent, LoadingStubDirective],
      imports: [
        GoogleChartsModule.forRoot(),
        ReactiveFormsModule,
        CustomMaterialModule,
        BrowserAnimationsModule
      ],
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
    }).createComponent(EntitiesSentimentComponent);
    component = fixture.componentInstance;
  }));


  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
