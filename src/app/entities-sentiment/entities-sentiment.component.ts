import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material";

export interface PeriodicElement {
  name: string;
  position: number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: "Hydrogen" },
  { position: 2, name: "Helium" },
  { position: 3, name: "Lithium" },
  { position: 4, name: "Beryllium" },
  { position: 5, name: "Boron" },
  { position: 6, name: "Carbon" },
  { position: 7, name: "Nitrogen" },
  { position: 8, name: "Oxygen" },
  { position: 9, name: "Fluorine" },
  { position: 10, name: "Neon" }
];
@Component({
  selector: "app-entities-sentiment",
  templateUrl: "./entities-sentiment.component.html",
  styleUrls: ["./entities-sentiment.component.scss"]
})
export class EntitiesSentimentComponent implements OnInit {
  displayedColumns: string[] = ["position", "name"];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor() {}
  scoreByMention = [
    [4,3], 
    [2,34],
    [66,77]
  ];
  averages = [
    [3, 4],
    [10, 10],
    [30, 30],
    [55, 46],
  ];

  options = {
    legend: { position: "none" },
    colors: ["green"]
  };
  ngOnInit() {}
}
