import { Component, OnInit } from '@angular/core';
import { FoldersService } from 'src/app/services/folders.service';
import { SnippetsService } from 'src/app/services/snippets.service';
import { ProjectsService } from '../../../services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass']
})
export class ProjectsComponent implements OnInit {

  projects = [];
  folders = [];
  loadingData = true;
  
  constructor(
    private projectsService: ProjectsService,    
    private foldersService: FoldersService,
  ) { }

  ngOnInit(): void {
    this.foldersService.getFolders()
      .subscribe( (res: any) => {
        console.log(res);
        this.folders = res;
        this.loadingData = false;
      }, err => {
        console.log(err);
      });
    
    this.projectsService.getProjects()
      .subscribe( (res: any) => {
        console.log(res);
        this.projects = res;
        this.loadingData = false;
      }, err => {
        console.log(err);
      });

    this.foldersService.newFolderEmitter
      .subscribe( (folder: any) => {
        console.log(folder);
        this.folders.push(folder);
      }, err => {
        console.log(err);
      });

    this.projectsService.newProjectEmitter
      .subscribe( (project: any) => {
        console.log(project);
        this.projects.push(project);
      }, err => {
        console.log(err);
      });
  }

}
