import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/core/data.service';
import { WeightFormData } from 'src/app/interfaces/weightForm';
import { DateValidator } from 'src/app/pages/signup/date.validator';


@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/add.dialog.html',
  styleUrls: ['../../dialogs/add/add.dialog.css']
})

export class AddDialogComponent implements OnInit {

  /** Form for adding weight */
  addGroup: FormGroup;

  /** Error validation messages */
  weightValidationMessage = {
    weight: [
      { type: 'required', message: 'Weight is required' },
      { type: 'min', message: 'Weight must be greater than 10 pounds' },
      { type: 'max', message: 'Weight must be less than 500 pounds' },
      { type: 'pattern', message: 'Weight can only contain numbers' }
    ],
  };

  /**
   * @param dialogRef Used for dialog box
   * @param data Form data {weight:..., date:...}
   * @param dataService Sends data to backend
   * @param formBuilder Builds form
   */
  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WeightFormData,
    public dataService: DataService,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit() {

    /* Defining structure of reactive forms */
    this.addGroup = this.formBuilder.group({
      weight : ['', [
        Validators.required,
        Validators.min(10),
        Validators.max(500),
        Validators.pattern('[0-9]*'),
        ]
      ],
      date : ['', [
        Validators.required,
        DateValidator.validDate,
        ]
      ]
    });

  } // End ngOnInit


  onNoClick(): void {
    this.dialogRef.close();
  }

  /** Sends data from form to back-end using a service */
  public confirmAdd(): void {

    this.data = {
      weight: this.addGroup.value.weight,
      date: this.addGroup.value.date,
    };

    this.dataService.addItem(this.data);

  }

}
