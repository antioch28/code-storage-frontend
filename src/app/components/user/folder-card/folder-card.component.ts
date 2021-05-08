import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { filter, switchMap } from "rxjs/operators";
import { FoldersService } from '../../../services/folders.service';
import { DialogService } from '../../../services/dialog.service';
import { SnackBarService } from '../../../services/snack-bar.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-folder-card',
  templateUrl: './folder-card.component.html',
  styleUrls: ['./folder-card.component.sass']
})
export class FolderCardComponent implements OnInit {

  @Input() folder: any;
  @Output() unstarredFolder: EventEmitter<string> = new EventEmitter<string>();
  @Output() deletedFolder: EventEmitter<string> = new EventEmitter<string>();
  @Output() undeletedFolder: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private router: Router,
    private userService: UserService,
    private folderService: FoldersService,
    private dialogService: DialogService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
    
  }

  openFolder() {
    this.router.navigate([`my/folders/${this.folder._id}`]);
  }

  stareFolder() {
    this.folderService.stareFolder(this.folder._id, !this.folder.starred)
      .subscribe( res => {
        console.log(res);
        this.folder = res;

        if (this.folder.starred) {
          this.snackBarService.openSnackBar(`Se agregó ${this.folder.name} a destacados`, null);
        } else {
          this.snackBarService.openSnackBar(`Se eliminó ${this.folder.name} de destacados`, null);
          this.unstarredFolder.emit(this.folder._id);
        }
      }, err => {
        console.log(err);
      });
  }

  onDeleteFolder() {
    this.dialogService.openDeleteElementDialog({
      name: this.folder.name,
      type: 'carpeta',
      perm: false
    }).subscribe( res => {
      if(res) {
        this.folderService.deleteFolder( this.folder._id )
          .subscribe( (result: any) => {
            console.log(result);
            if (result.deleted) {
              this.deletedFolder.emit( this.folder._id );
              this.snackBarService.openSnackBar( `Se envió ${this.folder.name} a la papelera`, null);
            }
          }, err => {
            console.log(err);
          });
      }
    }, err => {
      console.log(err);
    });
  }

  onDeletePermFolder() {
    this.dialogService.openDeleteElementDialog({
      name: this.folder.name,
      type: 'carpeta',
      perm: true
    }).subscribe( res => {
      if(res) {
        this.folderService.deletePermFolder( this.folder._id )
          .subscribe( (result: any) => {
            console.log("Eliminado permanente: ", result);
            
            if (result.ok === 1) {
              this.deletedFolder.emit( this.folder._id );
              this.snackBarService.openSnackBar( `Se eliminó ${this.folder.name} definitivamente`, null);
            }
          }, err => {
            console.log(err);
          });
      }
    }, err => {
      console.log(err);
    });
  }

  onUndeleteFolder() {
    this.folderService.undeleteFolder( this.folder._id )
      .subscribe( (res: any) => {
        console.log(res);
        if (!res.deleted) {
          this.undeletedFolder.emit( this.folder._id );          
          this.snackBarService.openSnackBar( `Se restauró ${this.folder.name}`, null);
        }
      }, err => {});
  }

  shareFolder( ) {    
    this.dialogService.openShareElementDialog( {type: 'carpeta', name: this.folder.name })
      .pipe(
        filter( (res: any) => res && res.sharedWith !== ''),
        switchMap( (res: any) => this.folderService.shareFolder(this.folder._id, res._id))
      )
      .subscribe( result => {
        console.log(result);
        this.snackBarService.openSnackBar(`Se compartió ${this.folder.name}`, null);
      }, err => {
        console.log(err);
      });
  }

}
