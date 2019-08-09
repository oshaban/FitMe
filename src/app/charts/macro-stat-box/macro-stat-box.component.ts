import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication.service';

@Component({
  selector: 'app-macro-stat-box',
  templateUrl: './macro-stat-box.component.html',
  styleUrls: ['./macro-stat-box.component.scss']
})
export class MacroStatBoxComponent implements OnInit {

  /** Stores a users macros: {protein: .., fat: .., carbs: ..} */
  private userMacros;

  /** When true, data is ready from back-end */
  private ready;

  /**
   *
   * @param auth Service to fetch a users macros
   */
  constructor(
    private auth: AuthenticationService,
  ) { }

  ngOnInit() {

    this.ready = false;

    this.auth.getUser().subscribe(
      (resData) => {
        this.userMacros = resData.fitnessProfile.macros;

        if (this.userMacros) {
          this.ready = true;
        }

      }
    );

  }

}
