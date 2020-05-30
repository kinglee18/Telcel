import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GoogleChartsModule } from 'angular-google-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from './material.module';
import { ActivityComponent } from './components/activity/activity.component';
import { TrendsComponent } from './components/trends/trends.component';
import { EntitiesSentimentComponent } from './components/entities-sentiment/entities-sentiment.component';
import { ComentsComponent } from './components/coments/coments.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EntityBoxComponent } from './components/entity-box/entity-box.component';
import { LoaderComponent } from './directives/loader/loader.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RequestInterceptor } from './request-interceptor';
import { ReviewDialogComponent } from './components/review-dialog/review-dialog.component';
import { CommentsReplyComponent } from './components/comments-reply/comments-reply.component';
import { PermissionsDirective } from './directives/permissions.directive';
import { EmptyDirective } from './directives/empty.directive';
import { EmptyComponent } from './directives/empty/empty.component';
import { UserListComponent } from './administration/user-list/user-list.component';
import { UserUpdateComponent } from './administration/user-update/user-update.component';
import { DirectivesModule } from './directives/directives.module';
import { NoSelectionDirective } from './no-selection.directive';
import { NoSelectionComponent } from './no-selection/no-selection.component';

@NgModule({
  entryComponents: [LoaderComponent, ReviewDialogComponent, EmptyComponent],
  declarations: [
    AppComponent,
    ActivityComponent,
    TrendsComponent,
    EntitiesSentimentComponent,
    ComentsComponent,
    EntityBoxComponent,
    LoaderComponent,
    LoginComponent,
    DashboardComponent,
    ReviewDialogComponent,
    CommentsReplyComponent,
    EmptyComponent,
    UserListComponent,
    UserUpdateComponent,
    NoSelectionDirective,
    NoSelectionComponent
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
    HttpClientModule,
    DirectivesModule
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
