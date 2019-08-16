import { Component, OnInit, Input } from '@angular/core';

/**
 * Interface for macronutrients
 */
export interface Macros {
  stat: string;
  amount: string;
}

@Component({
  selector: 'app-goaltable',
  templateUrl: './goaltable.component.html',
  styleUrls: ['./goaltable.component.scss']
})
export class GoaltableComponent implements OnInit {
  /** Input for a users goal */
  @Input() userGoal: number;

  /** Input for a users TDEE */
  @Input() userTDEE: number;

  /** Input for a users caloric surplus/deficit */
  @Input() userCalDiff: number;

  /** Input for a users recommended calories */
  @Input() userCalories: number;

  /** Data source for table */
  dataSource: Macros[] = [];

  /** Columns to display data */
  displayedColumns: string[] = ['stat', 'amount']; // Columns to display from data

  constructor() { }

  ngOnInit() {

    // Determine whether user is gaining/loosing weight
    let gainMsg = '';
    if ( this.userGoal >= 0) {
      gainMsg = 'gain';
    } else {
      gainMsg = 'loss';
    }

    // Determine whether user is on a caloric surplus or deficit
    let surplusMsg = '';
    if ( this.userCalDiff >= 0) {
      surplusMsg = 'surplus';
    } else {
      surplusMsg = 'deficit';
    }

    // Setting data source to graph
    this.dataSource =  [
      { stat: 'Weekly weight ' + gainMsg, amount: this.userGoal + ' lbs'},
      { stat: 'Caloric ' + surplusMsg, amount: this.userCalDiff + ' cal'},
      { stat: 'TDEE ', amount: this.userTDEE + ' cal'},
      { stat: 'Recommended caloric intake', amount: this.userCalories + ' cal'},
    ];

  }

}
