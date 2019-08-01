import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

/**
 * @title Profile Component
 */

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  /* Initializing forms */
  userDetailsGroup: FormGroup;
  fitnessInfoGroup: FormGroup;

  // Error messages for user validation
    // Can access in profile.component.html by: *ngFor="let validation of userValidationMessage.<username>
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
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ],
    confirmPassword: [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'areEqual', message: 'Password mismatch' }
    ],
  };

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {

    /* Defining structure of first reactive forms */
    this.userDetailsGroup = this.formBuilder.group({
      username : ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.pattern('[a-zA-Z0-9]*')
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
      gender : ['', [
        Validators.required,
        ]
      ],
      activitylevel : ['', [
        Validators.required,
        ]
      ],
    });


  } // End ngOnInit
} // End class ProfileComponent
