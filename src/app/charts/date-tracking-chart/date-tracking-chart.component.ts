import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../core/user-data.service';

@Component({
  selector: 'app-date-tracking-chart',
  templateUrl: './date-tracking-chart.component.html',
  styleUrls: ['./date-tracking-chart.component.scss']
})

export class DateTrackingChartComponent implements OnInit {

  /**
   * Stores a users weight to be plotted
   */
  weightData: any[] = [];

  // Chart Options
  view: any[] = [700, 400];
  colorScheme = {
    domain: ['#007bff']
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

  /**
   *
   * @param userDataService Used to fetch a users weight data
   */
  constructor(
    private userDataService: UserDataService,
  ) {}

  ngOnInit() {
    this.weightData = this.userDataService.getWeightsMulti();
  }

}
