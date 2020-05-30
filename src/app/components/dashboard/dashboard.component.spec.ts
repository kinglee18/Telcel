import {
  TestBed,
  async,
  ComponentFixture,
  ComponentFixtureAutoDetect
} from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { GoogleChartsModule } from "angular-google-charts";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { of, Observable, BehaviorSubject } from "rxjs";
import { SatDatepickerModule, SatNativeDateModule } from "saturn-datepicker";
import { DashboardComponent } from "./dashboard.component";
import { CustomMaterialModule } from "../../material.module";
import { CustomerCareService } from "../../services/customer-care.service";
import { authServiceStub } from '../../login/login.component.spec';
import { AuthService } from '../../services/auth.service';

export class CustomerCareServiceStub {
  branches$ = new BehaviorSubject([]);

  getCenters() {
    this.branches$.next([
      { name: "Tabasco cac", id: 22 },
      { name: "mexico cac", id: 1 },
      { name: "oaxaca cac", id: 2 },
      { name: "queretaro cac", id: 3 },
      { name: "tlalpan", id: 4 }
    ]);
  }

  saveDateRange() { }
  setDateRange(date) { }
  selectBranches() { }
}

describe("DashboardComponent", () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
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
        },
        { provide: AuthService, useValue: authServiceStub }
      ],
      declarations: [DashboardComponent]
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  }));

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should render title in a h1 tag", async () => {
    fixture.debugElement.nativeElement.querySelector("#cac-select").click();
    fixture.detectChanges();
    
    expect(
      document.querySelector("#cac-search-box").parentNode.childNodes
        .length
    ).toEqual(7);
  });
});
