import {
  TestBed,
  async,
  ComponentFixture,
  ComponentFixtureAutoDetect
} from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { ReactiveFormsModule } from "@angular/forms";
import { GoogleChartsModule } from "angular-google-charts";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CustomMaterialModule } from "./material.module";
import { CustomerCareService } from "./customer-care.service";
import { of, Observable } from "rxjs";
import { SatDatepickerModule, SatNativeDateModule } from "saturn-datepicker";
import { timeout } from "rxjs/operators";

export class CustomerCareServiceStub {
  branchesChanged$ = new Observable();

  getCenters() {
    return of([
      { name: "Tabasco cac", id: 22 },
      { name: "mexico cac", id: 1 },
      { name: "oaxaca cac", id: 2 },
      { name: "queretaro cac", id: 3 },
      { name: "tlalpan", id: 4 }
    ]).toPromise();
  }
  setDateRange(date) {}
  selectBranches() {}
}

describe("AppComponent", () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        CustomMaterialModule,
        GoogleChartsModule.forRoot(),
        NgxMatSelectSearchModule,
        BrowserAnimationsModule,
        SatDatepickerModule,
        SatNativeDateModule
      ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        {
          provide: CustomerCareService,
          useValue: new CustomerCareServiceStub()
        }
      ],
      declarations: [AppComponent]
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  }));

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should render title in a h1 tag", async () => {
    fixture.debugElement.nativeElement.querySelector("#cac-select").click();
    fixture.detectChanges();
    expect(
      document.querySelector("#cdk-overlay-0").children[0].children[0].children
        .length
    ).toEqual(6);
  });
});
