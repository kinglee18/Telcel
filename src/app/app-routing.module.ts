import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ActivityComponent } from "./activity/activity.component";
import { TrendsComponent } from "./trends/trends.component";
import { EntitiesSentimentComponent } from "./entities-sentiment/entities-sentiment.component";
import { ComentsComponent } from "./coments/coments.component";

const routes: Routes = [

      { path: "activity", component: ActivityComponent },
      { path: "trends", component: TrendsComponent },
      { path: "entities-sentiment", component: EntitiesSentimentComponent },
      { path: "coments", component: ComentsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
