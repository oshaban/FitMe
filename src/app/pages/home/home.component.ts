import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser'; // For setting page title
import { UserDataService } from '../../core/user-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /**
   * Title of page
   */
  pageTitle = 'Dashboard';

  /**
   * Stores data for statboxes
   */
  StatBoxData = [];

  /**
   * Stores current weight value
   */
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
  userGoal: {goalType: string, perWeek: number};

  /**
   * User TDEE
   */
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
    private userDataService: UserDataService
    ) {
    }


  ngOnInit() {
    this.title.setTitle(this.pageTitle); // Sets page title

    // Updates dashboard components data

    this.StatBoxData = [
      {
        title: 'Current Weight',
        subtitle: 'Weight as of ' + this.userDataService.getCurrentWeight().date.toLocaleDateString('en-US'),
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
        numDisplay: this.userDataService.getUserTDEE(),
        unit: 'cal',
        icon: 'faChartPie',
        routerLink: 'calories'
      },
    ];

    // Dashboard 2
    this.userGoal = this.userDataService.getUserGoal();

    // Dashboard 3
    this.userTDEE = this.userDataService.getUserTDEE();

    // Donought-chart data
    this.userProtien = 200;
    this.userFat = 60;
    this.userCarb = 400;

  }

  test() {
    this.userDataService.datatoMulti();
  }

}
