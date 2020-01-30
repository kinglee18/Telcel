import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ActivityComponent } from "./activity.component";
import { GoogleChartsModule } from "angular-google-charts";
import { CustomMaterialModule } from "../material.module";
import { ReactiveFormsModule } from "@angular/forms";

import { NO_ERRORS_SCHEMA, Directive, Input } from "@angular/core";
import { CustomerCareService } from "../customer-care.service";
import { CustomerCareServiceStub } from "../app.component.spec";
import { CommentsService } from "../comments.service";

export class commentsServiceStub {}

@Directive({ selector: "[apploading]" })
export class LoadingStubDirective {
  @Input()
  set apploading(loading: boolean) {}
}

describe("ActivityComponent", () => {
  let component: ActivityComponent;
  let fixture: ComponentFixture<ActivityComponent>;

  beforeEach(async(() => {
    fixture = TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ActivityComponent, LoadingStubDirective],
      imports: [GoogleChartsModule, CustomMaterialModule, ReactiveFormsModule],
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
    }).createComponent(ActivityComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
