import { Component, OnInit } from '@angular/core';

import { UserDataService } from '../../core/user-data.service';
import { AuthenticationService } from 'src/app/core/authentication.service';

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

  private ready;

  /**
   *
   * @param userDataService Service to fetch a users data
   */
  constructor(
    private userDataService: UserDataService,
    private auth: AuthenticationService,
  ) { }

  ngOnInit() {

    this.ready = false;

    this.auth.getUser().subscribe(
      (resData) => {
        this.userMacros = resData.fitnessProfile.macros;

        if(this.userMacros) {
          this.ready = true;
        }

      }
    );

    // this.userMacros = this.userDataService.getUserMacros();
    // this.userProtein = this.userMacros.protein;
    // this.userFat = this.userMacros.fat;
    // this.userCarb = this.userMacros.carbs;
  }

}
