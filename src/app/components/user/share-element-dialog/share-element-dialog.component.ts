import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-share-element-dialog',
  templateUrl: './share-element-dialog.component.html',
  styleUrls: ['./share-element-dialog.component.sass']
})
export class ShareElementDialogComponent implements OnInit {

  showHint = false;
  err = 'No se encontró ningún usuario registrado con ese correo';

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<ShareElementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit(): void {
    console.log("Recibí: ", this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();    
  }

  verifyUser () {
    this.userService.verifyIfSignedIn( this.data.sharedWith )
      .subscribe( (res: any) => {        
        if (res.ok) {
          this.dialogRef.close({ _id: res._id });
        } else {
          this.showHint = true;
        }
      }, err => {
        console.log(err);
      });
  }

}
