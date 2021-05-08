import { Injectable, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DeleteElementDialogComponent } from '../components/user/delete-element-dialog/delete-element-dialog.component';
import { NewFolderDialogComponent } from '../components/user/new-folder-dialog/new-folder-dialog.component';
import { NewProjectDialogComponent } from '../components/user/new-project-dialog/new-project-dialog.component';
import { NewSnippetDialogComponent } from '../components/user/new-snippet-dialog/new-snippet-dialog.component';
import { ShareElementDialogComponent } from '../components/user/share-element-dialog/share-element-dialog.component';
import { ProfilePicDialogComponent } from '../components/user/profile-pic-dialog/profile-pic-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) {}

  openCreateFolderDialog() {
    const dialogRef = this.dialog.open(NewFolderDialogComponent, {
      width: '350px',
      hasBackdrop: true,
      data: {}
    });

    return dialogRef.afterClosed();
  }

  openCreateProjectDialog() {
    const dialogRef = this.dialog.open(NewProjectDialogComponent, {
      width: '350px',
      hasBackdrop: true,
      data: { name: '', description: ''}
    });

    return dialogRef.afterClosed();
  }

  openCreateSnippetDialog() {
    const dialogRef = this.dialog.open(NewSnippetDialogComponent, {
      width: '350px',
      hasBackdrop: true,
      data: { name: '', description: ''}
    });

    return dialogRef.afterClosed();    
  }

  openDeleteElementDialog( data ) {
    const dialogRef = this.dialog.open(DeleteElementDialogComponent, {
      width: '350px',
      hasBackdrop: true,
      data: data
    });

    return dialogRef.afterClosed();    
  }

  openShareElementDialog( data ) {
    const dialogRef = this.dialog.open(ShareElementDialogComponent, {
      width: '350px',
      hasBackdrop: true,
      data: data
    });

    return dialogRef.afterClosed();
  }

  openProfilePicDialog( data ){
    const dialogRef = this.dialog.open(ProfilePicDialogComponent, {
      width: '350px',
      hasBackdrop: true,
      data: data
    });

    return dialogRef.afterClosed();
  }
}
