import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GoogleChartsModule } from 'angular-google-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from './material.module';
import { ActivityComponent } from './activity/activity.component';
import { TrendsComponent } from './trends/trends.component';
import { EntitiesSentimentComponent } from './entities-sentiment/entities-sentiment.component';
import { ComentsComponent } from './coments/coments.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';

@NgModule({
  declarations: [
    AppComponent,
    ActivityComponent,
    TrendsComponent,
    EntitiesSentimentComponent,
    ComentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleChartsModule.forRoot(),
    BrowserAnimationsModule,
    CustomMaterialModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    SatDatepickerModule,
    SatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
