import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { ReactiveFormsModule } from "@angular/forms";
import { GoogleChartsModule } from "angular-google-charts";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CustomMaterialModule } from "./material.module";
import { CustomerCareService } from "./customer-care.service";
import { of } from "rxjs";
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';

export class CustomerCareServiceStub {
  getCenters() {
    return of([
      { name: "Tabasco cac", id: 22 },
      { name: "mexico cac", id: 1 },
      { name: "oaxaca cac", id: 2 },
      { name: "queretaro cac", id: 3 },
      { name: "tlalpan", id: 4 }
    ]);
  }
}

describe("AppComponent", () => {
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
        {
          provide: CustomerCareService,
          useValue: new CustomerCareServiceStub()
        }
      ],
      declarations: [AppComponent]
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it("should render title in a h1 tag", async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const component = fixture.debugElement.nativeElement.querySelector(
      "#cac-select"
    );
    component.click();
    fixture.detectChanges();
    expect(
      document.querySelector("#cdk-overlay-0").children[0].children[0].children
        .length
    ).toEqual(6);
  }));
});
