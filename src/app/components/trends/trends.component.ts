import { Component, OnInit } from "@angular/core";
import { CustomerCareService } from "../../services/customer-care.service";
import { GeneralBoard } from "../general-board";
import { Board } from "../../board";
import { CommentsService } from "../../services/comments.service";
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
    legend: { position: "none" },
    explorer: { actions: ["dragToZoom", "rightClickToReset"] }
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
    super.ngOnInit();
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
    this.request = this.commentsService.getBySentiment(centers, date).subscribe(
      (data: any) => {
        this.averageSentiment = this.setScatterChartStyle(
          data.averageSentiment
        );
        this.lowerAverage = data.lowerAverage.map((element: Array<any>) => {
          [element[1], element[2]] = [element[2], element[1]];
          return element;
        });
        this.highestAverage = data.highestAverage.map((element: Array<any>) => {
          [element[1], element[2]] = [element[2], element[1]];
          return element;
        });
        this.loading = false;
      },
      error => {}
    );
  }

  /**
   *
   * @param elements
   */
  setScatterChartStyle(elements) {
    return elements.map((element: Array<any>) => {
      const name: string = element.splice(0, 1)[0];
      element.push(element[1] > 0 ? "fill-color: blue" : "fill-color: red");

      element.push(`
      <div class="p-2">
        <table>
          <tr><td><b>${name.charAt(0).toUpperCase() +
            name.slice(1)}</b></td></tr>
          <tr><td>Puntaje: ${element[1]}</td></tr>
          <tr><td>Menciones: ${element[0]}</td></tr>
        </table>
      </div>`);
      return element;
    });
  }
}
