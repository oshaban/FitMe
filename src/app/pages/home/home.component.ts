import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser'; // For setting page title
import { UsersService, Users } from 'src/app/core/users.service';
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


  private userFetchObs: Observable<any>;

  /**
   * @param title Injects title service into component
   * @param usersService Injects userservice to interact with API
   */
  constructor(
    private title: Title,
    private usersService: UsersService
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
  }

}
