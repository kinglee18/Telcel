import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ActivityComponent } from "./components/activity/activity.component";
import { TrendsComponent } from "./components/trends/trends.component";
import { EntitiesSentimentComponent } from "./components/entities-sentiment/entities-sentiment.component";
import { ComentsComponent } from "./components/coments/coments.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";
import { LoginGuard } from './login.guard';
import { CommentsReplyComponent } from './components/comments-reply/comments-reply.component';

const routes: Routes = [
  { path: 'administration', loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule) },
  { path: "login", component: LoginComponent },
  {
    path: "",
    canActivateChild: [LoginGuard],
    component: DashboardComponent,
    children: [
      { path: "activity", component: ActivityComponent },
      { path: "trends", component: TrendsComponent },
      { path: "entities-sentiment", component: EntitiesSentimentComponent },
      { path: "comments", component: ComentsComponent },
      { path: "comments-reply", component: CommentsReplyComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
