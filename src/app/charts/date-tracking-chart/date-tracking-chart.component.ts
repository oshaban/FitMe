/*
FROM: https://valor-software.com/ng2-charts/#LineChart
*/

import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../core/user-data.service';

@Component({
  selector: 'app-date-tracking-chart',
  templateUrl: './date-tracking-chart.component.html',
  styleUrls: ['./date-tracking-chart.component.scss']
})

export class DateTrackingChartComponent implements OnInit {

  multi: any[] = [
    {
      name: 'Weight',
      series: [
        {
          value: 150,
          name: '2016-09-19T23:07:09.324Z'
        },
        {
          value: 200,
          name: '2016-09-14T19:19:47.323Z'
        },
        {
          value: 200,
          name: '2016-09-14T13:42:47.347Z'
        },
        {
          value: 200,
          name: '2016-09-23T04:14:51.090Z'
        },
        {
          value: 200,
          name: '2016-09-18T18:52:42.292Z'
        }
      ]
    },
  ];

  // Chart Options

  view: any[] = [700, 400];
  colorScheme = {
    domain: ['#007bff', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  gradient = false;
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'Date';
  yAxisLabel = 'Weight';
  autoScale = true;
  timeline = true;
  showGridLines = true;

  constructor(
    private userDataService: UserDataService,
  ) { }

  ngOnInit() {
    // this.testData = this.userDataService.getWeights();
  }

}
