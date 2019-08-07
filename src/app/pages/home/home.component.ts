import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser'; // For setting page title
import { UserDataService } from '../../core/user-data.service';
import { WeightsDataService } from 'src/app/core/weights-data.service';
import { UserGetData } from 'src/app/interfaces/userRes';
import { WeightsGetData } from 'src/app/interfaces/weightsRes';



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
   * @param usersService Injects userservice to interact with API
   * @param userDataService Used to get fitness data from the current user
   */
  constructor(
    private title: Title,
    private userDataService: UserDataService,
    private weightsDataService: WeightsDataService,
    ) {
    }


  ngOnInit() {
    // Set page title
    this.title.setTitle(this.pageTitle);

    // Fetch data from back-end
    this.weightsDataService.getWeights().subscribe( (resData: WeightsGetData) => {
      // console.log(resData);
      this.userWeights = resData;

      if (this.userWeights) { this.userWeightAvail = true; }

    });

    this.userDataService.getUser().subscribe( (resData: UserGetData) => {
      // console.log(resData);
      this.userData = {...resData}; // Clone the resData object

      if (this.userData) { this.userDataAvail = true; }

      console.log(this.userData);

    });

    // Updates dashboard components data

    this.StatBoxData = [
      {
        title: 'Current Weight',
        subtitle: 'Weight as of ' + this.userDataService.getCurrentWeight().name.substring(0, 10),
        numDisplay: this.userDataService.getCurrentWeight().value,
        unit: 'lbs',
        icon: 'faChartLine',
        routerLink: ''
      },
      {
        title: 'Your Goal',
        subtitle: this.userDataService.getUserGoal().goalType + ' per week',
        numDisplay: this.userDataService.getUserGoal().perWeek,
        unit: 'lbs',
        icon: 'faChartBar',
        routerLink: 'goals'
      },
      {
        title: 'Your Calories',
        subtitle: 'To meet your goal',
        numDisplay: this.userTDEE,
        unit: 'cal',
        icon: 'faChartPie',
        routerLink: 'calories'
      },
    ];

    // Dashboard 2
    this.userGoal = 1;

    // Dashboard 3
    
    console.log(' test ' + this.userData);

    // Donought-chart data
    this.userProtien = 200;
    this.userFat = 60;
    this.userCarb = 400;

  } // End ngOnInit

}
