import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  languages = [
    ["Español", 900],
    ["Otros", 100]
  ];
  monthlyReviews = [
    ["nov 2018", 8136000],
    ["dic 2020", 8538000],
    ["Feb 2019", 2244000],
    ["nov 2018", 8136000],
    ["dic 2020", 8538000],
    ["Feb 2019", 2244000],
    ["nov 2018", 8136000],
    ["dic 2020", 8538000],
    ["Feb 2019", 2244000],
    ["nov 2018", 8136000],
    ["dic 2020", 8538000],
    ["Feb 2019", 2244000],
    ["nov 2018", 8136000],
    ["dic 2020", 8538000],
    ["Feb 2019", 2244000],
    ["nov 2018", 8136000],
    ["dic 2020", 8538000],
    ["Feb 2019", 2244000],
    ["nov 2018", 8136000],
    ["dic 2020", 8538000],
    ["Feb 2019", 2244000],
    ["nov 2018", 8136000],
    ["dic 2020", 8538000],
    ["Feb 2019", 2244000],
    ["may 2020", 19500000]
  ];

  otherLanguages = [
    ['Ingles', 50],
    ['Japones', 10]
  ];
  options = {
    bar: {groupWidth: "35%" }
  };

  constructor() { }

  ngOnInit() {
  }

}
