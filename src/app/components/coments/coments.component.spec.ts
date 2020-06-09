import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { GoogleChartsModule } from "angular-google-charts";
import { ReactiveFormsModule } from "@angular/forms";
import { CustomMaterialModule } from "../../material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import {
  LoadingStubDirective,
  commentsServiceStub
} from "../activity/activity.component.spec";
import { CommentsService } from "../../services/comments.service";
import { CustomerCareService } from "../../services/customer-care.service";
import { CustomerCareServiceStub } from "../../app.component.spec";
import { ComentsComponent } from "./coments.component";

describe("ComentsComponent", () => {
  let component: ComentsComponent;
  let fixture: ComponentFixture<ComentsComponent>;

  beforeEach(async(() => {
    fixture = TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ComentsComponent, LoadingStubDirective],
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
    }).createComponent(ComentsComponent);
    component = fixture.componentInstance;
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should return a comment with a <b> tag inside if it matches with the keyword", () => {
    component.entityName = "Atención";
    expect(
      component.highlightComment(" que buena atencion recibi en sucursal")
    ).toBe(" que buena <b>atencion</b> recibi en sucursal");
  });
});
