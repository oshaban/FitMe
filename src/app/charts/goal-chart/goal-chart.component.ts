import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication.service';

@Component({
  selector: 'app-goal-chart',
  templateUrl: './goal-chart.component.html',
  styleUrls: ['./goal-chart.component.scss']
})
export class GoalChartComponent implements OnInit {

  /** When true, data is ready from back-end */
  public ready;

  /** Stores a users weekly weight gain/loss */
  private userGoal;

  /** Stores a users recommended calories */
  private userCalories;

  /** Stores a users recommended calories above/below TDEE */
  private userCalDiff;

  /** Stores a users recommended calories above/below TDEE */
  private userTDEE;


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
        this.userGoal = resData.fitnessProfile.goal;
        this.userCalories = resData.fitnessProfile.recommendedCalories;

        if (this.userGoal != null) {

          // Find a users recommended calories above/below TDEE
          switch (this.userGoal) {
            case -1: this.userCalDiff = -500; break;
            case -0.5: this.userCalDiff = -250; break;
            case 0: this.userCalDiff = 0; break;
            case 0.5: this.userCalDiff = 250; break;
            case 1: this.userCalDiff = 500; break;
          }

          this.userTDEE = this.userCalories - this.userCalDiff;

          this.ready = true;
        }

      }
    );

  }

}
