import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/core/user-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DateValidator } from '../signup/date.validator'; // Validates that date isn't past today
import { WeightsDataService } from 'src/app/core/weights-data.service';

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
   * @param weightsService Used to fetch user weights and update user weights
   */
  constructor(
    private userDataService: UserDataService,
    private formBuilder: FormBuilder,
    private weightsService: WeightsDataService,
  ) { }

  ngOnInit() {

    // Fetches weights from backend
    this.weightsService.getWeights().subscribe(
      (resData) => {
        console.log(resData.weight);
        this.userWeight = resData.weight;
    });

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

    if (this.updateWeightGroup.valid) {

      this.weightsService.addWeight({
        weight: this.updateWeightGroup.value.weightControl,
        date: this.updateWeightGroup.value.dateControl,
      }).subscribe( (resData) => {
        console.log(resData);
      });

    } // End if

  } // END onSubmit()

}
