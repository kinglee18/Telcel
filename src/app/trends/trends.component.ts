import { Component, OnInit } from "@angular/core";
import { CustomerCareService } from "../customer-care.service";
import { Subscription } from "rxjs";
import { GeneralBoard } from "../general-board";
import { Board } from "../board";
import { CommentsService } from "../comments.service";
import {
  ScriptLoaderService,
  GoogleChartPackagesHelper
} from "angular-google-charts";

@Component({
  selector: "app-trends",
  templateUrl: "./trends.component.html",
  styleUrls: ["./trends.component.scss"]
})
export class TrendsComponent extends GeneralBoard implements Board, OnInit {
  averageSentiment: Array<object> = [];
  lowerAverage: Array<Array<number>> = [];
  highestAverage: Array<Array<number>> = [];

  options = {
    hAxis: { title: "Número de menciones" },
    vAxis: { title: "Puntaje de sentimiento" },
    tooltip: { isHtml: true },
    focusTarget: "category"
  };

  table1Columns: string[] = ["Entidad", "Puntuación"];

  formatter = [];
  constructor(
    customerService: CustomerCareService,
    private commentsService: CommentsService,
    private loaderService: ScriptLoaderService
  ) {
    super(customerService);
  }

  ngOnInit() {
    this.loaderService.onReady.subscribe(() => {
      this.loaderService
        .loadChartPackages([
          GoogleChartPackagesHelper.getPackageForChartName("Table")
        ])
        .subscribe(() => {
          this.formatter.push({
            formatter: new google.visualization.BarFormat({ width: 120 }),
            colIndex: 2
          });
        });
    });
  }

  showBoardInfo(centers, date) {
    this.request = this.commentsService
      .getBySentiment(centers, date)
      .subscribe((data: any) => {
        this.averageSentiment = data.averageSentiment;
        this.lowerAverage = data.lowerAverage;
        this.highestAverage = data.highestAverage;
        this.loading = false;
      });
  }
}