import { Component, OnInit } from '@angular/core';
import { SnippetsService } from 'src/app/services/snippets.service';
import { FoldersService } from 'src/app/services/folders.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.sass']
})
export class SharedComponent implements OnInit {

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
    this.foldersService.getSharedFolders()
      .subscribe( (res: any) => {        
        this.folders = res;
        this.loadingData = false;
      }, err => {
        console.log(err);
      });

    this.projectsService.getSharedProjects()
      .subscribe( (res: any) => {
        this.projects = res;
        this.loadingData = false;
      }, err => {
        console.log(err);
      });
    
    this.snippetsService.getSharedSnippets()
      .subscribe( (res: any) => {
        this.snippets = res;
        this.loadingData = false;
      }, err => {
        console.log(err);
      });
  }

  onDeletedFolder( folderId ) {    
    let index = this.folders.findIndex( folder => folder._id == folderId);

    if (index > -1) {
      this.folders.splice(index, 1);
    }
  }

  onDeletedProject( projectId ) {
    let index = this.projects.findIndex( project => project._id == projectId);

    if (index > -1) {
      this.snippets.splice(index, 1);
    }
  }

  onDeletedSnippet( snippetId ) {
    let index = this.snippets.findIndex( snippet => snippet._id == snippetId);

    if (index > -1) {
      this.snippets.splice(index, 1);
    }
  }


}
