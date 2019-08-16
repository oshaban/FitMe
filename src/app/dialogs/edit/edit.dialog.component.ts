import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/core/data.service';

@Component({
  selector: 'app-baza.dialog',
  templateUrl: '../../dialogs/edit/edit.dialog.html',
  styleUrls: ['../../dialogs/edit/edit.dialog.css']
})
export class EditDialogComponent implements OnInit {

  /** Form for adding weight */
  addGroup: FormGroup;

  /** Stores weight document to edit  */
  weightDoc: {id: string; value: number; name: string };

  /** Error validation messages */
  weightValidationMessage = {
    weight: [
      { type: 'required', message: 'Weight is required' },
      { type: 'min', message: 'Weight must be greater than 10 pounds' },
      { type: 'max', message: 'Weight must be less than 500 pounds' },
      { type: 'pattern', message: 'Weight can only contain numbers' }
    ],
  };

  /** Displays date of weight being edited  */
  private weightDate;

  /**
   * @param dialogRef Used for dialog box
   * @param data Form data {weight:..., date:...}
   * @param dataService Sends data to backend
   * @param formBuilder Builds form
   */
  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: DataService,
    private formBuilder: FormBuilder,
  ) {
      console.log(data);
      this.weightDoc = data; // Gets data to be edited
      this.weightDate = data.name; // Gets date of entry being edited
    }

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
      });

    } // End ngOnInit

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {

    // PUT request format {weight:..., date:..,}
    this.data = {
      weight: this.addGroup.value.weight,
      date: this.weightDoc.name
    };

    /* console.log('POST DATA: ');
    console.log(this.data);
    console.log('id to edit: ' + this.weightDoc.id); */
    this.dataService.updateItem(this.weightDoc.id, this.data);
  }
}
