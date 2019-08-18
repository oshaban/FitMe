import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { DataService } from 'src/app/core/data.service';


@Component({
  selector: 'app-delete.dialog',
  templateUrl: '../../dialogs/delete/delete.dialog.html',
  styleUrls: ['../../dialogs/delete/delete.dialog.css']
})

export class DeleteDialogComponent {

  /** Stores weight document to delete  */
  weightDoc: { id: string; value: number; name: string };

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService
    ) {
      // console.log(data);
      this.weightDoc = data;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  /** Sends weight document id to service to delete  */
  confirmDelete(): void {
    // console.log(this.weightDoc.id);
    this.dataService.deleteItem(this.weightDoc.id);
  }
}
