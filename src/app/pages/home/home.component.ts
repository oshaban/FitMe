import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser'; // For setting page title
import { WeightsDataService } from 'src/app/core/weights-data.service';
import { UserGetData } from 'src/app/interfaces/userRes';
import { WeightsGetData } from 'src/app/interfaces/weightsRes';
import { AuthenticationService } from 'src/app/core/authentication.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /** Title of page */
  pageTitle = 'Dashboard';

  /** Stores user data fetched from back-end */
  userData: UserGetData;

  /** Stores user weight data fetched from back-end */
  userWeights: WeightsGetData;

  /** User Data Initially not available */
  userDataAvail = false;

  /** User Weight Initially not available */
  userWeightAvail = false;

  /** Stores data for displaying multiple statboxes. Each array entry is a new statbox. */
  StatBoxData = [];

  /** Stores current weight value */
  currentWeight: number;

  /** Stores date of current weight in string mm/dd/yyyy */
  currentDate: string;

  /**
   * User goal in object format
   * goalType is either 'gain' or 'lose'
   * perWeek is amount of pounds user wants to gain/loose per week
   */
  userGoal: number;

  /** Goal is either 'gain', 'loose' or 'maintain'  */
  goalSubtitle: string;

  /**
   * @param title Injects title service into component
   * @param auth Injects auth service to get fitness data of current user
   * @param weightsService Injects weightService to get weight data from current user
   */
  constructor(
    private title: Title,
    private auth: AuthenticationService,
    private weightsService: WeightsDataService,
    ) {}


  ngOnInit() {

    // Set page title
    this.title.setTitle(this.pageTitle);

    // Initially data from back-end is not available
    this.userDataAvail = false;
    this.userWeightAvail = false;

    // Fetch user data from back-end
    this.auth.getUser().subscribe(
      (resData: UserGetData) => {
        // console.log(resData);

        this.userData = resData;

        // Check if data from back-end is available
        if (this.userData) {
          this.userDataAvail = true;
        }

        // Determine sub-title for goal
        if (this.userData.fitnessProfile.goal === 0) {
          this.goalSubtitle = 'Maintain your weight';
        } else if(this.userData.fitnessProfile.goal > 0) {
          this.goalSubtitle = 'Gain per week';
        } else {
          this.goalSubtitle = 'Loose per week';
        }
        this.userGoal = Math.abs(this.userData.fitnessProfile.goal);

        // Determine display for weight:
        const weightDate = new Date(this.userData.fitnessProfile.startWeight.date);
        const strDate = weightDate.toLocaleDateString('en-US');

        // Update statbox displays with data from back-end
        this.StatBoxData = [
          {
            title: 'Starting Weight',
            subtitle: 'Weight on ' + strDate,
            numDisplay: this.userData.fitnessProfile.startWeight.weight,
            unit: 'lbs',
            icon: 'faChartLine',
            routerLink: 'weight'
          },
          {
            title: 'Your Goal',
            subtitle: this.goalSubtitle,
            numDisplay: this.userGoal,
            unit: 'lbs',
            icon: 'faChartBar',
            routerLink: 'goals'
          },
          {
            title: 'Your Calories',
            subtitle: 'To meet your goal',
            numDisplay: resData.fitnessProfile.recommendedCalories,
            unit: 'cal',
            icon: 'faChartPie',
            routerLink: ''
          },
        ];

    });

    // Fetch weight data from back-end
    this.weightsService.getWeights().subscribe(
      (resData: WeightsGetData) => {
        // console.log(resData);
        this.userWeights = resData;

        // Check if data from back-end is available
        if (this.userWeights) {
          this.userWeightAvail = true;
        }

    });

  } // End ngOnInit

}
