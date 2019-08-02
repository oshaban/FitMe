import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

/**
 * This component graphs protein, carb, and fat intakes
 */

@Component({
  selector: 'app-macro-doughnut-chart',
  templateUrl: './macro-doughnut-chart.component.html',
  styleUrls: ['./macro-doughnut-chart.component.scss']
})
export class MacroDonoughtChartComponent implements OnInit {

  private numtest: number;

  /**
   * Protein input for graph
   */
  @Input() protein: number;

  /**
   * Carb input for graph
   */
  @Input() carb: number;

  /**
   * Fat input for graph
   */
  @Input() fat: number;

  /**
   * Labels for graph
   */
  public doughnutChartLabels: Label[] = ['Protien', 'Fat', 'Carbohydrates'];

  /**
   * Data to be graphed
   */
  public doughnutChartData: MultiDataSet = [
    [10, 20, 30],
  ];

  /**
   * Chart type is doughnut
   */
  public doughnutChartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit() {
    this.numtest = 10;
  }

 // Chart events

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
