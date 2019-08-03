import { Component, OnInit } from '@angular/core';

/**
 * Interface for macronutrients
 */
export interface Macros {
  macro: string;
  amount: number;
}

const DATA: Macros[] = [
  { macro: 'Protein', amount: 10 },
  { macro: 'Fats', amount: 10 },
  { macro: 'Carbs', amount: 10 },
];

/**
 * @title Table to display macronutrients
 */
@Component({
  selector: 'app-macrotable',
  templateUrl: './macrotable.component.html',
  styleUrls: ['./macrotable.component.scss']
})

export class MacrotableComponent implements OnInit {

  displayedColumns: string[] = ['macro', 'amount']; // Columns to display from data
  dataSource = DATA; // Setting data source

  constructor() { }

  ngOnInit() {
  }

}
