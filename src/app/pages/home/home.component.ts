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
   * Stores loaded users
   */
  loadedUsers = [];

  /**
   * Stores current weight value
   */
  currentWeight: number;

  /**
   * Stores date of current weight in string mm/dd/yyyy
   */
  currentDate: string;

  /**
   * Stores date of current weight
   */
  currentTDEE: number;

  /**
   * Stores user protien intake
   */
  userProtien: number;

  /**
   * Stores user fat intake
   */
  userFat: number;

  /**
   * Stores user carb intake
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

    // Dashboard 1
    this.currentWeight = this.userDataService.getCurrentWeight().value;
    this.currentDate = this.userDataService.getCurrentWeight().date.toLocaleDateString('en-US');

    // Dashboard 2

    // Dashboard 3
    this.currentTDEE = this.userDataService.getTDEE();

    // Donought-chart data
    this.userProtien = 200;
    this.userFat = 60;
    this.userCarb = 400;

  }

}
