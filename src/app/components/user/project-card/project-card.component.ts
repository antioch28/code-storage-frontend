import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsService } from '../../../services/projects.service';
import { SnackBarService } from '../../../services/snack-bar.service';
import { DialogService } from '../../../services/dialog.service';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.sass']
})
export class ProjectCardComponent implements OnInit {

  @Input() project: any;
  @Output() unstarredProject: EventEmitter<string> = new EventEmitter<string>();
  @Output() deletedProject: EventEmitter<string> = new EventEmitter<string>();
  @Output() undeletedProject: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private projectService: ProjectsService,
    private snackBarService: SnackBarService,
    private dialogService: DialogService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  openProject() {
    this.router.navigate([`my/projects/${this.project._id}`]);
  }

  stareProject() {
    this.projectService.stareProject(this.project._id, !this.project.starred)
      .subscribe( res => {
        console.log(res);
        this.project = res;

        if (this.project.starred) {
          this.snackBarService.openSnackBar(`Se agregó ${this.project.name} a destacados`, null);
        } else {
          this.snackBarService.openSnackBar(`Se eliminó ${this.project.name} de destacados`, null);
          this.unstarredProject.emit(this.project._id);
        }
      }, err => {
        console.log(err);
      });
  }

  shareProject( ) {    
    this.dialogService.openShareElementDialog( {type: 'proyecto', name: this.project.name })
      .pipe(
        filter( (res: any) => res && res.sharedWith !== ''),
        switchMap( (res: any) => this.projectService.shareProject(this.project._id, res._id))
      )
      .subscribe( result => {
        console.log(result);
        this.snackBarService.openSnackBar(`Se compartió ${this.project.name}`, null);
      }, err => {
        console.log(err);
      });
  }

  onDeleteProject() {
    this.dialogService.openDeleteElementDialog({
      name: this.project.name,
      type: 'carpeta',
      perm: false
    }).subscribe( res => {
      if(res) {
        this.projectService.deleteProject( this.project._id )
          .subscribe( (result: any) => {
            console.log(result);
            if (result.deleted) {
              this.deletedProject.emit( this.project._id );
              this.snackBarService.openSnackBar( `Se envió ${this.project.name} a la papelera`, null);
            }
          }, err => {
            console.log(err);
          });
      }
    }, err => {
      console.log(err);
    });
  }

  onDeletePermProject() {
    this.dialogService.openDeleteElementDialog({
      name: this.project.name,
      type: 'carpeta',
      perm: true
    }).subscribe( res => {
      if(res) {
        this.projectService.deletePermProject( this.project._id )
          .subscribe( (result: any) => {
            console.log("Eliminado permanente: ", result);
            
            if (result.ok === 1) {
              this.deletedProject.emit( this.project._id );
              this.snackBarService.openSnackBar( `Se eliminó ${this.project.name} definitivamente`, null);
            }
          }, err => {
            console.log(err);
          });
      }
    }, err => {
      console.log(err);
    });
  }

  onUndeleteProject() {
    this.projectService.undeleteProject( this.project._id )
      .subscribe( (res: any) => {
        console.log(res);
        if (!res.deleted) {
          this.undeletedProject.emit( this.project._id );          
          this.snackBarService.openSnackBar( `Se restauró ${this.project.name}`, null);
        }
      }, err => {});
  }

}
