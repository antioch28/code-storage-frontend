import { Component, OnInit } from '@angular/core';
import { FoldersService } from 'src/app/services/folders.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { SnippetsService } from 'src/app/services/snippets.service';

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

}
