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

  /** Stores data fetched from back-end */
  userData: UserGetData;

  /** Stores data fetched from back-end */
  userWeights: WeightsGetData;

  /** User Data Initially not available */
  userDataAvail = false;

  /** User Weight Initially not available */
  userWeightAvail = false;

  /** Stores data for statboxes */
  StatBoxData = [];

  /** Stores current weight value */
  currentWeight: number;

  /**
   * Stores date of current weight in string mm/dd/yyyy
   */
  currentDate: string;

  /**
   * User goal in object format
   * goalType is either 'gain' or 'lose'
   * perWeek is amount of pounds user wants to gain/loose per week
   */
  userGoal: number;

  /** User TDEE */
  userTDEE: number;

  /**
   * User protien intake
   */
  userProtien: number;

  /**
   * User fat intake
   */
  userFat: number;

  /**
   * User carb intake
   */
  userCarb: number;

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

    // Fetch user data from back-end
    this.auth.getUser().subscribe(
      (resData: UserGetData) => {
        console.log(resData);
        this.userData = resData;

        this.StatBoxData = [
          {
            title: 'Current Weight',
            subtitle: 'Weight as of ' + '7/24/19',
            numDisplay: 100,
            unit: 'lbs',
            icon: 'faChartLine',
            routerLink: ''
          },
          {
            title: 'Your Goal',
            subtitle: 'loose' + ' per week',
            numDisplay: 1,
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
            routerLink: 'calories'
          },
        ];

    });

    // Fetch weight data from back-end
    this.weightsService.getWeights().subscribe(
      (resData: WeightsGetData) => {
        console.log(resData);
        this.userWeights = resData;
    });

    // Updates dashboard components data

  } // End ngOnInit

}
