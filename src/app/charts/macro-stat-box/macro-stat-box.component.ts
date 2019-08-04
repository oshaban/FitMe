import { Component, OnInit } from '@angular/core';

import { UserDataService } from '../../core/user-data.service';

@Component({
  selector: 'app-macro-stat-box',
  templateUrl: './macro-stat-box.component.html',
  styleUrls: ['./macro-stat-box.component.scss']
})
export class MacroStatBoxComponent implements OnInit {

  /**
   * Stores a users protein data
   */
  private userProtein;

  /**
   * Stores a users fat data
   */
  private userFat;

  /**
   * Stores a users carb data
   */
  private userCarb;

  /**
   * Stores a users macros: {protein: .., fat: .., carbs: ..}
   */
  private userMacros;

  /**
   *
   * @param userDataService Service to fetch a users data
   */
  constructor(
    private userDataService: UserDataService
  ) { }

  ngOnInit() {
    this.userMacros = this.userDataService.getUserMacros();
    this.userProtein = this.userMacros.protein;
    this.userFat = this.userMacros.fat;
    this.userCarb = this.userMacros.carbs;
  }

}
