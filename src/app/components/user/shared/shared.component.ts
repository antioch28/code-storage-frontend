import { Component, OnInit } from '@angular/core';
import { SnippetsService } from 'src/app/services/snippets.service';
import { FoldersService } from 'src/app/services/folders.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.sass']
})
export class SharedComponent implements OnInit {

  folders = [];
  projects = [];
  snippets = [];

  constructor(
    private foldersService: FoldersService,
    private projectsService: ProjectsService,
    private snippetsService: SnippetsService
  ) { }

  ngOnInit(): void {
    this.foldersService.getSharedFolders()
      .subscribe( (res: any) => {
        this.folders = res;
      }, err => {
        console.log(err);
      });

    this.projectsService.getSharedProjects()
      .subscribe( (res: any) => {
        this.projects = res;
      }, err => {
        console.log(err);
      });
    
    this.snippetsService.getSharedSnippets()
      .subscribe( (res: any) => {
        this.snippets = res;
      }, err => {
        console.log(err);
      });
  }

}
