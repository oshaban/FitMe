import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser'; // For setting page title
import { UsersService } from 'src/app/core/users.service';
import { UpdateDashboardService } from 'src/app/core/update-dashboard.service';
import { Observable } from 'rxjs';

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
   * Stores date of current weight
   */
  currentDate: Date;

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

  private userFetchObs: Observable<any>;

  /**
   * @param title Injects title service into component
   * @param usersService Injects userservice to interact with API
   * @param dashboardService: Sets necessary variables to update statbox display
   */
  constructor(
    private title: Title,
    private usersService: UsersService,
    private dashboardService: UpdateDashboardService,
    ) {
      this.getUsers();
    }

  getUsers() {
/*
    this.userFetchObs = this.usersService.getAllUsers(); // This returns an observable

    // Subscribe to the observable
    this.userFetchObs.subscribe(
      (resData) => {
        console.log(resData);

        // Goes through each object in JSON
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            this.loadedUsers.push(resData[key]); // Add the user to the loaded users
          }
        }

      }, (errorData) => { console.log(errorData); }
    ); */

  }

  ngOnInit() {
    this.title.setTitle(this.pageTitle); // Sets page title

    // Update dashboard components data

    // Dashboard 1
    this.currentWeight = 105;
    this.currentDate = new Date(2019, 5);
    this.currentTDEE = 3000;

    // Dashboard 2
    this.currentWeight = 105;
    this.currentDate = new Date(2019, 5);
    this.currentTDEE = 3000;

    // Dashboard 3
    this.currentWeight = 105;
    this.currentDate = new Date(2019, 5);
    this.currentTDEE = 3000;

    // Donought-chart data
    this.userProtien = 200;
    this.userFat = 60;
    this.userCarb = 400;

  }

}
