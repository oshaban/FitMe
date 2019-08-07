import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication.service';

/* const userTest = {
    username: '14helerk',
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
}; */

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

/*     this.authenticationService.createUser(userTest).subscribe(
      (resData) => {
        console.log(resData);
        console.log('sucess!');
      },
      (err) => {
        console.log('err.error ' + err.error);
      }
    );

    this.authenticationService.logInUser(userLogin).subscribe();
 */
  }

} // End PageNotFoundComponent
