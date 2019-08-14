import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/core/data.service';
import { WeightFormData } from 'src/app/interfaces/weightForm';


@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/add.dialog.html',
  styleUrls: ['../../dialogs/add/add.dialog.css']
})

// NOTE data is {weight: , date: }
export class AddDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WeightFormData, // Form data is {weight:.., date:...}
    public dataService: DataService
    ) { }

  formControl = new FormControl('', [
    Validators.required
  ]);

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.dataService.addItem(this.data);
  }

}
