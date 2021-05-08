import { Component, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImagePipe } from '../../../pipes/image.pipe';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-profile-pic-dialog',
  templateUrl: './profile-pic-dialog.component.html',
  styleUrls: ['./profile-pic-dialog.component.sass']
})
export class ProfilePicDialogComponent implements AfterViewInit {

  @ViewChild('picPreview') picPreview: ElementRef;
  picture: File;

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<ProfilePicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    @Inject(ImagePipe) private imagePipe
  ) {
  }

  ngAfterViewInit(): void {
    this.picPreview.nativeElement.setAttribute('src', this.imagePipe.transform(this.data.profile));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileUpdated( evt ){
    const file = (evt.target as HTMLInputElement).files[0];

    this.picture = file;

    const fileReader = new FileReader();
    fileReader.onload = () => {      
      this.picPreview.nativeElement.setAttribute('src', fileReader.result as string);
    }
    fileReader.readAsDataURL(file);
  }

  updateProfile() {
    if (!this.picture) {
      return;
    }

    let profile = new FormData();
    profile.append('profile', this.picture);

    this.userService.updateProfilePic(profile)
      .subscribe( (res: any) => {
        console.log("Respuesta perfil: ", res);
        this.dialogRef.close( res.profile );
      }, err => {
        console.log(err);
      })
  }

}
