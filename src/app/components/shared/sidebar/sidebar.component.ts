import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FoldersService } from 'src/app/services/folders.service';
import { ProjectsService } from '../../../services/projects.service';
import { SnippetsService } from '../../../services/snippets.service';
import { DialogService } from '../../../services/dialog.service';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

  @ViewChild('drawer') drawer: MatDrawer;

  showSidebarMenu = true;
  showFiller = false;
  manualToggle = false;

  newFolder = '';
  newProject = { name: "", description: "", folderId: null };
  newSnippet = { name: "", description: "" };
  parentFolder = null;

  constructor(
    private navigationService: NavigationService,
    private foldersService: FoldersService,
    private projectsService: ProjectsService,
    private snippetsService: SnippetsService,
    private dialogService: DialogService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.foldersService.currentFolder.subscribe( folderId => {
      console.log("Carpeta actual: ", folderId);
      this.parentFolder = folderId;
    });

    this.navigationService.toggleSidebar.subscribe( toggle => {
      this.showFiller = toggle;
    }, error => {
      console.log(error);
    });

    this.navigationService.hasSidebarMenu.subscribe( hasMenu => {
      this.showSidebarMenu = hasMenu;
    });
  }

  openFolderDialog(): void {
    this.dialogService.openCreateFolderDialog()
      .subscribe( result => {
        if (result) {
          this.newFolder = result;          

          if (this.newFolder !== "") {
            this.foldersService.createFolder( {name: this.newFolder, parentFolder:  this.parentFolder})
              .subscribe( (res: any) => {
                if (res._id) {
                  this.foldersService.pushNewFolder(res);
                }
              }, err => {
                console.log(err);
              });
          }
        }
      }, err => {
        console.log(err);
      });    
  }

  openProjectDialog(): void {

    this.dialogService.openCreateProjectDialog()
      .subscribe( result => {        
        if (result) {
          this.newProject = result;
          this.newProject.folderId = this.parentFolder;
  
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
      }, err => {
        console.log(err);
      });    
  }

  openSnippetDialog(): void {
    
    this.dialogService.openCreateSnippetDialog()
      .subscribe(result => {
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
