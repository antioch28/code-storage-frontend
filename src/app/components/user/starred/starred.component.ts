import { Component, OnInit } from '@angular/core';
import { FoldersService } from 'src/app/services/folders.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { SnippetsService } from 'src/app/services/snippets.service';

@Component({
  selector: 'app-starred',
  templateUrl: './starred.component.html',
  styleUrls: ['./starred.component.sass']
})
export class StarredComponent implements OnInit {

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
    this.foldersService.getStarredFolders()
      .subscribe( (res: any) => {
        this.folders = res;
        this.loadingData = false;
      }, err => {
        console.log(err);
      });

    this.projectsService.getStarredProjects()
      .subscribe( (res: any) => {
        this.projects = res;
        this.loadingData = false;
      }, err => {
        console.log(err);
      });
    
    this.snippetsService.getStarredSnippets()
      .subscribe( (res: any) => {
        this.snippets = res;
        this.loadingData = false;
      }, err => {
        console.log(err);
      });
  }

  onUnstarredFolder( folderId ) {
    let index = this.folders.findIndex( folder => folder._id == folderId);

    if (index > -1) {
      this.folders.splice(index, 1);
    }
  }

  onUnstarredProject( projectId ) {
    let index = this.projects.findIndex( project => project._id == projectId);

    if (index > -1) {
      this.projects.splice(index, 1);
    }
  }

  onUnstarredSnippet( snippetId ) {
    let index = this.snippets.findIndex( snippet => snippet._id == snippetId);

    if (index > -1) {
      this.snippets.splice(index, 1);
    }
  }


}
