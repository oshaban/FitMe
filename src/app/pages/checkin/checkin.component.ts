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
   * Stores form submission for user weight input
   */
  private weightInput: number;

  /**
   * Stores form submission for user date input
   */
  private dateInput: Date;

  /**
   * Stores a users weights from the server
   */
  private userWeight: {value: number, name: string}[];

  /**
   *
   * @param userDataService Used to fetch user data and update user data
   * @param formBuilder Used to create form for user weight submission
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

    this.userWeight = this.userDataService.getUserWeights();
  }

  /**
   * When user submits form, this will update the weight in the back-end
   */
  private onSubmit() {

    this.userDataService.getUserWeights();

    // Get values from form submission
    this.dateInput = this.updateWeightGroup.value.dateControl;
    this.weightInput = this.updateWeightGroup.value.weightControl;

    // Check if the weight entry for the given date exists
    this.userWeight = this.userDataService.getUserWeights();

    // Adds a weight to the server it it doesn't exist, otherwise updates an existing entry
    this.userDataService.addWeight({value: this.weightInput, name: this.dateInput.toISOString()});

  }

}
