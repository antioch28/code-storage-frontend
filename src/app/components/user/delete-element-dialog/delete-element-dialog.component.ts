import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-element-dialog',
  templateUrl: './delete-element-dialog.component.html',
  styleUrls: ['./delete-element-dialog.component.sass']
})
export class DeleteElementDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteElementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
