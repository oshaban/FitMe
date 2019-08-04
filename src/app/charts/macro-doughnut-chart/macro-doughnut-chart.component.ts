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

  /**
   * Protein input for graph
   */
  @Input() protein: number;

  /**
   * Carb input for graph
   */
  @Input() carbs: number;

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
  public doughnutChartData: MultiDataSet;

  /**
   * Chart type is doughnut
   */
  public doughnutChartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit() {

    // Sets chart data to be graphed
    this.doughnutChartData = [
      [this.protein, this.fat, this.carbs],
    ];

  }

 // Chart events

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
