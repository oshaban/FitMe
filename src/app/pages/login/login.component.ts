import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /**
   * Form for user login
   */
  userDetailsGroup: FormGroup;

  /**
   * Message to display if invalid form
   */
  formMessage: string;

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

  constructor(private fb: FormBuilder) { }

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

  onSubmit() {
    if (this.userDetailsGroup.valid) {
      // Send to HTTP

      
    } else {
      this.formMessage = "Invalid";
    }
  }

}
