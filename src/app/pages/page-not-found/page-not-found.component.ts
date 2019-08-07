import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication.service';
import { UserFormData } from 'src/app/interfaces/userForm';

const userTest = {
    username: 'heklr6',
    firstname: 'John',
    lastname: 'Doe',
    password: '8charpass',
    fitnessProfile: {
        startWeight: 150,
        goal: 1,
        gender: 'M',
        height: 154,
        birthDay: new Date(),
        activityMultiplier: 1,
    }
};

const userLogin = {
  username: 'heklr6',
  password: '8charpass',
};

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})

export class PageNotFoundComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {

    this.authenticationService.addUser(userTest).subscribe(
      resData => {
        console.log(resData);
      }
    );

    this.authenticationService.logInUser(userLogin).subscribe();

  }

} // End PageNotFoundComponent
