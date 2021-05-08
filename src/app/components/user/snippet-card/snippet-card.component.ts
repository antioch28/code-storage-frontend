import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from '../../../services/dialog.service';
import { SnippetsService } from '../../../services/snippets.service';
import { SnackBarService } from '../../../services/snack-bar.service';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-snippet-card',
  templateUrl: './snippet-card.component.html',
  styleUrls: ['./snippet-card.component.sass']
})
export class SnippetCardComponent implements OnInit {

  @Input() snippet: any;
  @Output() unstarredSnippet: EventEmitter<string> = new EventEmitter<string>();
  @Output() deletedSnippet: EventEmitter<string> = new EventEmitter<string>();
  @Output() undeletedSnippet: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private snippetsService: SnippetsService,
    private dialogService: DialogService,
    private snackBarService: SnackBarService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  openSnippet() {
    this.router.navigate([`my/snippets/${this.snippet._id}`]);
  }

  stareSnippet() {
    this.snippetsService.stareSnippet(this.snippet._id, !this.snippet.starred)
      .subscribe( res => {
        console.log(res);
        this.snippet = res;

        if (this.snippet.starred) {
          this.snackBarService.openSnackBar(`Se agregó ${this.snippet.name} a destacados`, null);
        } else {
          this.snackBarService.openSnackBar(`Se eliminó ${this.snippet.name} de destacados`, null);
          this.unstarredSnippet.emit(this.snippet._id);
        }
      }, err => {
        console.log(err);
      });
  }

  shareSnippet( ) {    
    this.dialogService.openShareElementDialog( {type: 'snippet', name: this.snippet.name })
      .pipe(
        filter( (res: any) => res && res.sharedWith !== ''),
        switchMap( (res: any) => this.snippetsService.shareSnippet(this.snippet._id, res._id))
      )
      .subscribe( result => {
        console.log(result);
        this.snackBarService.openSnackBar(`Se compartió ${this.snippet.name}`, null);
      }, err => {
        console.log(err);
      });
  }

  onDeleteSnippet() {
    this.dialogService.openDeleteElementDialog({
      name: this.snippet.name,
      type: 'snippet',
      perm: false
    }).subscribe( res => {
      if(res) {
        this.snippetsService.deleteSnippet( this.snippet._id )
          .subscribe( (result: any) => {
            console.log(result);
            if (result.deleted) {
              this.deletedSnippet.emit( this.snippet._id );
              this.snackBarService.openSnackBar( `Se envió ${this.snippet.name} a la papelera`, null);
            }
          }, err => {
            console.log(err);
          });
      }
    }, err => {
      console.log(err);
    });
  }

  onDeletePermSnippet() {
    this.dialogService.openDeleteElementDialog({
      name: this.snippet.name,
      type: 'snippet',
      perm: true
    }).subscribe( res => {
      if(res) {
        this.snippetsService.deletePermSnippet( this.snippet._id )
          .subscribe( (result: any) => {
            console.log("Eliminado permanente: ", result);
            
            if (result.ok === 1) {
              this.deletedSnippet.emit( this.snippet._id );
              this.snackBarService.openSnackBar( `Se eliminó ${this.snippet.name} definitivamente`, null);
            }
          }, err => {
            console.log(err);
          });
      }
    }, err => {
      console.log(err);
    });
  }

  onUndeleteSnippet() {
    this.snippetsService.undeleteSnippet( this.snippet._id )
      .subscribe( (res: any) => {
        console.log(res);
        if (!res.deleted) {
          this.undeletedSnippet.emit( this.snippet._id );          
          this.snackBarService.openSnackBar( `Se restauró ${this.snippet.name}`, null);
        }
      }, err => {});
  }

}
