import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /** Form for user login */
  userDetailsGroup: FormGroup;

  /** Message to display if invalid form */
  invalidForm = false;

  // Error messages for user validation
    // Can access in profile.component.html by: *ngFor="let validation of userValidationMessage.<username>
  userValidationMessage = {
    username: [
      { type: 'required', message: 'Username is required' },
    ],
    password: [
      { type: 'required', message: 'Password is required' },
    ],
  };

  /**
   * @param fb Used to build reactive form
   * @param authenticationService Service used to authenticate user login
   * @param router Used to route the user to dashboard once loggedin
   * @param toasterservice Used to display messages
   */
  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private toasterservice: MatSnackBar,
    ) { }

  ngOnInit() {

    // Defines user login form
    this.userDetailsGroup = this.fb.group({
      username : ['', [
          Validators.required,
        ]
      ],
      password : ['', [
        Validators.required,
        ]
      ],
    });
  }

  /** Authenticates user on submit */
  onSubmit() {

    // Send form data to back-end if form is valid
    if (this.userDetailsGroup.valid) {
      this.authenticationService.logInUser({
        username: this.userDetailsGroup.value.username,
        password: this.userDetailsGroup.value.password
      }).subscribe( (resData) => {

        // console.log('login component success!');
        this.toasterservice.open('Login Successful', '', { duration: 2000} );
        // If successful login, go to dashboard
        this.router.navigateByUrl('/dashboard');
      }, (err) => {
        // If err during login, show err message

        this.toasterservice.open('Error occurred. Details: ' + err.name + ' ' + err.message, '', { duration: 8000} );
        this.invalidForm = true; // Set login form invalid to display message
      });

    } // END if

  } // END onSubmit()

}
