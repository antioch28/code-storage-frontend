import { Component, OnInit } from '@angular/core';
import { FoldersService } from '../../../services/folders.service';
import { ProjectsService } from '../../../services/projects.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass']
})
export class ProjectsComponent implements OnInit {

  projects = [];
  folders = [];
  currentFolder: any = {};
  loadingData = true;
  hasSidebar = true;

  isFolderView = false;
  
  constructor(    
    private projectsService: ProjectsService,
    private foldersService: FoldersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( params => {
      
      if (params['folderId']) {  
        this.foldersService.setCurrentFolder(params['folderId']);
        this.isFolderView = true;
        this.foldersService.getFolder(params['folderId'])
          .subscribe( (res: any) => {
            console.log('Contenido de la carpeta: ', res);
            this.currentFolder = res;
            this.folders = res.folders;
            this.projects = res.projects;
            this.loadingData = false;
          }, err => {
            console.log(err);
          });
      } else {
        this.foldersService.setCurrentFolder(null);
        this.foldersService.getFolders()
          .subscribe( (res: any) => {        
          this.folders = res;
          this.loadingData = false;
        }, err => {
          console.log(err);
        });
    
        this.projectsService.getProjects()
          .subscribe( (res: any) => {
            this.projects = res;
            this.loadingData = false;
          }, err => {
            console.log(err);
          });
      }
    });

    this.foldersService.newFolderEmitter
      .subscribe( (folder: any) => {
        this.folders.push(folder);
      }, err => {
        console.log(err);
      });

    this.projectsService.newProjectEmitter
      .subscribe( (project: any) => {
        this.projects.push(project);
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
      this.projects.splice(index, 1);
    }
  }

  goBack() {
   if ( this.currentFolder.parentFolder != null) {
     this.router.navigate([`my/folders/${this.currentFolder.parentFolder}`]);
   } else {
     this.router.navigate(['../']);
   }
  }

}
