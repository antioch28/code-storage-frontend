import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-snippet-dialog',
  templateUrl: './new-snippet-dialog.component.html',
  styleUrls: ['./new-snippet-dialog.component.sass']
})
export class NewSnippetDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<NewSnippetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
