import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ActivityComponent } from "./activity/activity.component";
import { TrendsComponent } from "./trends/trends.component";
import { EntitiesSentimentComponent } from "./entities-sentiment/entities-sentiment.component";
import { ComentsComponent } from "./coments/coments.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";
import { LoginGuard } from './login.guard';

const routes: Routes = [
  { path: "", redirectTo: "activity", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  {
    path: "",
    canActivateChild: [LoginGuard],
    component: DashboardComponent,
    children: [
      { path: "activity", component: ActivityComponent },
      { path: "trends", component: TrendsComponent },
      { path: "entities-sentiment", component: EntitiesSentimentComponent },
      { path: "coments", component: ComentsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
