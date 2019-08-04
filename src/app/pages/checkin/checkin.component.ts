import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/core/user-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DateValidator } from '../signup/date.validator'; // Validates that date isn't past today

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})

export class CheckinComponent implements OnInit {

  /**
   * Form for user updating weight
   */
  private updateWeightGroup: FormGroup;

  /**
   *
   * @param userDataService Used to fetch user data and update user data
   */
  constructor(
    private userDataService: UserDataService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {

    this.updateWeightGroup = this.formBuilder.group({
      weightControl: ['', [
        Validators.required,
        Validators.min(10),
        Validators.max(500),
        Validators.pattern('[0-9]*')
        ]
      ],
      dateControl: ['', [
        Validators.required,
        DateValidator.validDate,
        ]
      ]
    });
  }

  /**
   * When user submits form, this will update the weight in the back-end
   */
  private onSubmit() {

    // TO DO

  }

}
