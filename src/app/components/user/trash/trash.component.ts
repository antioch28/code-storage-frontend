import { Component, OnInit } from '@angular/core';
import { FoldersService } from 'src/app/services/folders.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { SnippetsService } from 'src/app/services/snippets.service';
import { NavigationService } from '../../../services/navigation.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.sass']
})
export class TrashComponent implements OnInit {

  folders = [];
  projects = [];
  snippets = [];
  loadingData = true;

  constructor(
    private navigationService: NavigationService,
    private foldersService: FoldersService,
    private projectsService: ProjectsService,
    private snippetsService: SnippetsService
  ) { }

  ngOnInit(): void {
    this.foldersService.getDeletedFolders()
      .subscribe( (res: any) => {
        this.folders = res;
        this.loadingData = false;
      }, err => {
        console.log(err);
      });

    this.projectsService.getDeletedProjects()
      .subscribe( (res: any) => {
        this.projects = res;
        this.loadingData = false;
      }, err => {
        console.log(err);
      });
    
    this.snippetsService.getDeletedSnippets()
      .subscribe( (res: any) => {
        this.snippets = res;
        this.loadingData = false;
      }, err => {
        console.log(err);
      });

  }

  onUndeletedFolder( folderId ) {
    let index = this.folders.findIndex( folder => folder._id == folderId);

    if (index > -1) {
      this.folders.splice(index, 1);
    }
  }

  onDeletedPermFolder( folderId ) {
    let index = this.folders.findIndex( folder => folder._id == folderId);

    if (index > -1) {
      this.folders.splice(index, 1);
    }
  }

  onUndeletedProject( projectId ) {
    let index = this.projects.findIndex( project => project._id == projectId);

    if (index > -1) {
      this.projects.splice(index, 1);
    }
  }

  onDeletedPermProject( projectId ) {
    let index = this.projects.findIndex( project => project._id == projectId);

    if (index > -1) {
      this.projects.splice(index, 1);
    }
  }

  onUndeletedSnippet( snippetId ) {
    let index = this.snippets.findIndex( snippet => snippet._id == snippetId);

    if (index > -1) {
      this.snippets.splice(index, 1);
    }
  }

  onDeletedPermSnippet( snippetId ) {
    let index = this.snippets.findIndex( snippet => snippet._id == snippetId);

    if (index > -1) {
      this.snippets.splice(index, 1);
    }
  }

}
