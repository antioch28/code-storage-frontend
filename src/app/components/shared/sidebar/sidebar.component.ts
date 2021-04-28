import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NewFolderDialogComponent } from '../../user/new-folder-dialog/new-folder-dialog.component';
import { FoldersService } from 'src/app/services/folders.service';
import { NewProjectDialogComponent } from '../../user/new-project-dialog/new-project-dialog.component';
import { ProjectsService } from '../../../services/projects.service';
import { NewSnippetDialogComponent } from '../../user/new-snippet-dialog/new-snippet-dialog.component';
import { SnippetsService } from '../../../services/snippets.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

  showFiller = false;
  manualToggle = false;

  newFolder = '';
  newProject = { name: "", description: "" };
  newSnippet = { name: "", description: "" }

  constructor(
    private navigationService: NavigationService,
    private foldersService: FoldersService,
    private projectsService: ProjectsService,
    private snippetsService: SnippetsService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.navigationService.toggleSidebar.subscribe( toggle => {
      this.showFiller = toggle;
    }, error => {
      console.log(error);
    });
  }

  openFolderDialog(): void {
    const dialogRef = this.dialog.open(NewFolderDialogComponent, {
      width: '350px',
      hasBackdrop: true,
      data: { folderName: this.newFolder }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.newFolder = result;

        if (this.newFolder !== "") {
          this.foldersService.createFolder( {name: this.newFolder})
          .subscribe( (res: any) => {
            if (res._id) {
              this.foldersService.pushNewFolder(res);
            }
          }, err => {
            console.log(err);
          });
        }
      }
      
    });
  }

  openProjectDialog(): void {
    const dialogRef = this.dialog.open(NewProjectDialogComponent, {
      width: '350px',
      hasBackdrop: true,
      data: { name: this.newProject.name, description: this.newProject.description }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.newProject = result;

        if (this.newProject.name !== "") {

          this.projectsService.createProject( this.newProject )
          .subscribe( (res: any) => {
            if (res._id) {
              this.projectsService.pushNewProject(res);
            }
          }, err => {
            console.log(err);
          });
        }
      }
      
    });
  }

  openSnippetDialog(): void {
    const dialogRef = this.dialog.open(NewSnippetDialogComponent, {
      width: '350px',
      hasBackdrop: true,
      data: { name: this.newSnippet.name, description: this.newSnippet.description }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.newSnippet = result;   
        
        if (this.newSnippet.name !== "") {

          this.snippetsService.createSnippet( this.newSnippet )
          .subscribe( (res: any) => {
            if (res._id) {
              this.snippetsService.pushNewSnippet(res);
            }
          }, err => {
            console.log(err);
          });
        }
      }
      
    });
  }


}
