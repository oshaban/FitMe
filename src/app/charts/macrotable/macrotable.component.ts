import { Component, OnInit, Input } from '@angular/core';

/**
 * Interface for macronutrients
 */
export interface Macros {
  macro: string;
  amount: number;
}

/**
 * @title Table to display macronutrients
 */
@Component({
  selector: 'app-macrotable',
  templateUrl: './macrotable.component.html',
  styleUrls: ['./macrotable.component.scss']
})


export class MacrotableComponent implements OnInit {

  /**
   * Input for a users protein
   */
  @Input() protein: number;

  /**
   * Input for a users fat
   */
  @Input() fat: number;

  /**
   * Input for a users carbs
   */
  @Input() carbs: number;

  /**
   * Data source for table
   */
  dataSource: Macros[] = [];

  /**
   * Columns to display data
   */
  displayedColumns: string[] = ['macro', 'amount']; // Columns to display from data

  constructor() { }

  ngOnInit() {

    // Setting data source to graph
    this.dataSource =  [
      { macro: 'Protein', amount: this.protein },
      { macro: 'Fats', amount: this.fat },
      { macro: 'Carbs', amount: this.carbs },
    ];

  }

}
