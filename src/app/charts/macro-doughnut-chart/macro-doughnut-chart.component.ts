import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-macro-doughnut-chart',
  templateUrl: './macro-doughnut-chart.component.html',
  styleUrls: ['./macro-doughnut-chart.component.scss']
})
export class MacroDonoughtChartComponent implements OnInit {
  // Doughnut
  public doughnutChartLabels: Label[] = ['Protien', 'Fat', 'Carbohydrates'];
  public doughnutChartData: MultiDataSet = [
    [350, 450, 100],
  ];
  public doughnutChartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}