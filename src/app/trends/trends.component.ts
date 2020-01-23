import { Component, OnInit } from "@angular/core";
import { CustomerCareService } from "../customer-care.service";
import { Subscription } from "rxjs";
import { GeneralBoard } from "../general-board";
import { Board } from "../board";

@Component({
  selector: "app-trends",
  templateUrl: "./trends.component.html",
  styleUrls: ["./trends.component.scss"]
})
export class TrendsComponent extends GeneralBoard implements Board {
  averageSentiment = [
    [ 8,      12, -1]
  ];
  options = {
    hAxis: { title: "Número de menciones" },
    vAxis: { title: "Puntaje de sentimiento" },
    tooltip: { isHtml: true },
    focusTarget: 'category'
  };

  table1Columns: string[] = ["Entidad", "Puntuación"];
  lowerAverage = [
    { entity: "entidad 1", score: 33, mentions: 9 }
  ];
  constructor(customerService: CustomerCareService) {
    super(customerService);
  }

  showBoardInfo() {}
}
