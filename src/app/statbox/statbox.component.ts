import { Component, OnInit, Input } from '@angular/core';

import { faChartLine, faChartPie, faChartBar, IconDefinition } from '@fortawesome/free-solid-svg-icons';

/**
 * @title Used to display statboxes on dashboard
 */

@Component({
  selector: 'app-statbox',
  templateUrl: './statbox.component.html',
  styleUrls: ['./statbox.component.scss']
})
export class StatboxComponent implements OnInit {

  /**
   * Sets the font-awesome icon for the statbox
   */
  faChartIcon: IconDefinition;

  /**
   * Title for statbox
   */
  @Input() title: string;

  /**
   * Subtitle for statbox
   */
  @Input() subtitle: string;

  /**
   * Number to display for statbox
   */
  @Input() numDisplay: number;

  /**
   * Unit of measurement for statbox number
   */
  @Input() unit: string;

  /**
   * Displays icon for statbox
   * faChartLine, faChartPie
   */
  @Input() iconInput: string;

  /**
   * Sets the routerLink for when the statbox is clicked
   */
  @Input() routerLink: string;

  constructor() { }

  ngOnInit() {

    if (this.iconInput === 'faChartLine') {
      this.faChartIcon = faChartLine;
    } else if (this.iconInput === 'faChartPie') {
      this.faChartIcon = faChartPie;
    } else if (this.iconInput === 'faChartBar') {
      this.faChartIcon = faChartBar;
    } else { // Default icon to show
      this.faChartIcon = faChartPie;
    }

  } // End ngOnInit()

}
