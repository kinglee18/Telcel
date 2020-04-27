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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EntityBoxComponent } from './entity-box/entity-box.component';
import { LoadingDirective } from './loading.directive';
import { LoaderComponent } from './loader/loader.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RequestInterceptor } from './request-interceptor';
import { ReviewDialogComponent } from './review-dialog/review-dialog.component';
import { CommentsReplyComponent } from './comments-reply/comments-reply.component';
import { PermissionsDirective } from './permissions.directive';

@NgModule({
  entryComponents: [LoaderComponent, ReviewDialogComponent],
  declarations: [
    AppComponent,
    ActivityComponent,
    TrendsComponent,
    EntitiesSentimentComponent,
    ComentsComponent,
    EntityBoxComponent,
    LoadingDirective,
    LoaderComponent,
    LoginComponent,
    DashboardComponent,
    ReviewDialogComponent,
    CommentsReplyComponent,
    PermissionsDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleChartsModule.forRoot(),
    BrowserAnimationsModule,
    CustomMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMatSelectSearchModule,
    SatDatepickerModule,
    SatNativeDateModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
