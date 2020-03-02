import {
  MatButtonModule,
  MatCheckboxModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatChipsModule,
  MatTableModule,
  MatTabsModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatRadioModule,
  MatPaginatorModule
} from "@angular/material";
import { NgModule } from "@angular/core";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  SatDatepickerModule
} from "saturn-datepicker";
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter
} from "@angular/material-moment-adapter";

const list = [
  MatButtonModule,
  MatCheckboxModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatChipsModule,
  MatTableModule,
  MatTabsModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatRadioModule,
  SatDatepickerModule,
];

export const MY_FORMATS = {
  parse: {
    dateInput: "YYYY"
  },
  display: {
    dateInput: "YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY"
  }
};

@NgModule({
  imports: list,
  exports: list,
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, useValue: MY_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: "es-MX" }
  ]
})
export class CustomMaterialModule {}