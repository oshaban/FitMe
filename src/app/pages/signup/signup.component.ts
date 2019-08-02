import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserFormData } from '../../core/userFormData';
import { UsernameValidator } from './username.validator'; // Checks if username is taken
import { SignupService } from '../../core/signup.service';

/**
 * @title Signup Component
 */

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.scss'],
})
export class SignupComponent implements OnInit {

  /**
   * Form for user registration information
   */
  userDetailsGroup: FormGroup;

  /**
   * Form for user fitness profile information
   */
  fitnessInfoGroup: FormGroup;

  /**
   * Stores user information which is sent to the back-end for user signup
   */
  formData: UserFormData;

  /**
   * Error messages for form validation
   *  Can be accessed in profile.component.html by: *ngFor="let validation of userValidationMessage.<username>
   */
  userValidationMessage = {
    username: [
      { type: 'required', message: 'Username is required' },
      { type: 'minlength', message: 'Username must be at least 5 characters long' },
      { type: 'maxlength', message: 'Username cannot be more than 20 characters long' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters' },
      { type: 'validUsername', message: 'Your username has already been taken' }
    ],
    firstname: [
      { type: 'required', message: 'First Name is required' },
      { type: 'minlength', message: 'First Name must be at least 3 characters long' },
      { type: 'maxlength', message: 'First Name cannot be more than 20 characters long' },
      { type: 'pattern', message: 'Your First Name must contain only numbers and letters' },
    ],
    lastname: [
      { type: 'required', message: 'Last Name is required' },
      { type: 'minlength', message: 'Last Name must be at least 3 characters long' },
      { type: 'maxlength', message: 'Last Name cannot be more than 20 characters long' },
      { type: 'pattern', message: 'Your Last Name must contain only numbers and letters' },
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 8 characters long' },
      { type: 'maxlength', message: 'Password cannot be more than 25 characters long' },
    ],
  };

  fitnessValidationMessage = {
    startingweight: [
      { type: 'required', message: 'Weight is required' },
      { type: 'min', message: 'Weight must be greater than 10 pounds' },
      { type: 'max', message: 'Weight must be less than 500 pounds' },
      { type: 'pattern', message: 'Weight can only contain numbers' }
    ],
  };

  /**
   * Stores todays date
   */
  todayDate: Date;

  /**
   * @param formBuilder Used to create userDetailsGroup and fitnessInfoGroup forms
   * @param signupService Used to send form data to server
   */
  constructor(
    private formBuilder: FormBuilder,
    private signupService: SignupService
    ) {}

  ngOnInit() {

    /* Defining structure of first reactive forms */
    this.userDetailsGroup = this.formBuilder.group({
      username : ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.pattern('[a-zA-Z0-9]*'),
        UsernameValidator.validUsername,
        ]
      ],
      firstname : ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('[a-zA-z]*'),
        ]
      ],
      lastname : ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('[a-zA-z]*'),
        ]
      ],
      password : ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(25),
        ]
      ],
    });

    /* Defining structure of second reactive forms */
    this.fitnessInfoGroup = this.formBuilder.group({
      startingweight : ['', [
        Validators.required,
        Validators.min(10),
        Validators.max(500),
        Validators.pattern('[0-9]*')
        ]
      ],
      heightfeet: ['', [
        Validators.required,
        ]
      ],
      heightinches: ['', [
        Validators.required,
        ]
      ],
      gender : ['', [
        Validators.required,
        ]
      ],
      activitylevel : ['', [
        Validators.required,
        ]
      ],
      DOB : ['', [
        Validators.required,
        ]
      ],
      trainingstyle : ['', Validators.required ],
      goal : ['', Validators.required ],
    });

    this.todayDate = new Date();

  } // End ngOnInit

  /**
   * Called on submit event of form
   */
  private onSubmit() {

    // Create form data to submit to back-end
    this.formData = {
      username: this.userDetailsGroup.value.username,
      firstname: this.userDetailsGroup.value.firstname,
      lastname: this.userDetailsGroup.value.lastname,
      password: this.userDetailsGroup.value.password,
      fitnessProfile: {
        startWeight: { weight: this.fitnessInfoGroup.value.startingweight, date: this.todayDate },
        gender: this.fitnessInfoGroup.value.gender,
        height: (this.fitnessInfoGroup.value.heightfeet * 12) + this.fitnessInfoGroup.value.heightinches,
        birthDay: this.fitnessInfoGroup.value.DOB,
        activityMultiplier: this.fitnessInfoGroup.value.activitylevel,
        goal: this.fitnessInfoGroup.value.goal,
      }
    };

    console.log( this.formData );
    console.log(JSON.stringify(this.formData));

    // Call service to send POST request to back-end
    this.signupService.createUser( this.formData ).subscribe(
      resData => { console.log(resData);
    });

  } // End onSubmit()

} // End class ProfileComponent
