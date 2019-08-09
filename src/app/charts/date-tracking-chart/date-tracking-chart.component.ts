import { Component, OnInit } from '@angular/core';
import { WeightsDataService } from 'src/app/core/weights-data.service';

export interface WeightMultiData  {
  name: string;
  series: {value: number, name: Date}[];
}

@Component({
  selector: 'app-date-tracking-chart',
  templateUrl: './date-tracking-chart.component.html',
  styleUrls: ['./date-tracking-chart.component.scss']
})

export class DateTrackingChartComponent implements OnInit {

  /** Stores a users weight to be plotted */
  private weightData: any[] = [];

  /** Stores a users weights from back-end */
  private userWeights: WeightMultiData[] = [];

  /** When true, data is ready from back-end */
  private ready;

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
   * @param weightsService Used to fetch a users weight data
   */
  constructor(
    private weightsService: WeightsDataService,
  ) {}

  ngOnInit() {

    this.ready = false; // Data initially not ready

    this.weightsService.getWeights().subscribe(
      (resData) => {

        // weight series from back-end has {_id, value, name}
          // Filter out the _id by mapping
        const filteredData = resData.weight.map( (obj) => {
          return {value: obj.value, name: obj.name};
        });

        // Sort array to have earliest date in the start of array
        filteredData.sort( (a, b) => {
          return Date.parse(a.name) -  Date.parse(b.name);
        });

        // Add data from back-end to multidataset for plotting
        this.userWeights.push(
          {
            name: 'Weight',
            series: filteredData,
          }
        );

        // Data from back-end is ready
        if (this.userWeights.length > 0) {
          this.ready = true;
          console.log(this.userWeights);
        }

    });

  } // End ngOnInit()

}
