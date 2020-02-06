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
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
  DateAdapter,
  MatExpansionModule,
  MatChipsModule,
  MatTableModule,
  MatTabsModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatRadioModule
} from "@angular/material";
import { NgModule } from "@angular/core";
import { MomentDateAdapter } from "@angular/material-moment-adapter";

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
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatRadioModule
];

export const MY_FORMATS = {
  parse: {
    dateInput: "DD/MMM/YYYY"
  },
  display: {
    dateInput: "DD/MM/YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY"
  }
};

@NgModule({
  imports: list,
  exports: list,
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: "es-MX" },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class CustomMaterialModule {}
