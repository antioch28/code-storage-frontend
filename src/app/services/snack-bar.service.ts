import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  openSnackBar( msg, action) {
    this.snackBar.open(msg, action, {duration: 3000, horizontalPosition: 'end', verticalPosition: 'bottom'});
  }
}
