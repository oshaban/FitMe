import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userDetailsForm = this.fb.group({
    username : ['', [
        Validators.required,
      ]
    ],
    password : ['', [
      Validators.required,
      ]
    ],
  });

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
  }

  onSubmit() {
    if (this.userDetailsForm.valid) {
      console.log(this.userDetailsForm.value);
    }
  }

}
