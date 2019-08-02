import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
