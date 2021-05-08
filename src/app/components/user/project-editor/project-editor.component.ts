import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
//import  * as ace from "ace-builds";
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../../../services/projects.service';

@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.sass']
})
export class ProjectEditorComponent implements AfterViewInit {

  @ViewChild('previewFrame')
  previewFrame!: ElementRef<HTMLIFrameElement>;
  @ViewChild('html') html!: ElementRef<HTMLElement>;
  @ViewChild('css') css!: ElementRef<HTMLElement>;
  @ViewChild('js') js!: ElementRef<HTMLElement>;

  project: any = { code : { html: '', css: '', js: ''}};
  updatingProject = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectsService: ProjectsService,
    private router: Router
  ) { }

  ngAfterViewInit(): void {

    /* const htmlEditor = ace.edit(this.html.nativeElement);
    const cssEditor = ace.edit(this.css.nativeElement);
    const jsEditor = ace.edit(this.js.nativeElement); */

    this.activatedRoute.params.subscribe( params => {
      console.log(params);

      if (params.projectId) {
        this.projectsService.getProject(params.projectId)
          .subscribe( res => {
            console.log("Recibí proyecto: ", res);
            this.project = res;
            this.makeBlob();
          }, err => {
            console.log(err);
          });
      }
    });    
  }

  makeBlob(){

    let blob = new Blob([this.project.code.html], {type: 'text/html'});
    console.log('Blob: ', blob);

    const cssUrl = URL.createObjectURL(new Blob([this.project.code.css], {type: 'text/css'}));
    const jsUrl = URL.createObjectURL(new Blob([this.project.code.js], {type:'text/javascript'}));

    let jscrpt: HTMLScriptElement = document.createElement('script');
    jscrpt.innerText = this.project.code.js;

    let cssTag: HTMLStyleElement = document.createElement('style');
    cssTag.innerText = this.project.code.css;

    // this.previewFrame.nativeElement.contentDocument.head.appendChild(cssTag);

    // this.previewFrame.nativeElement.src = URL.createObjectURL(blob);
    // this.previewFrame.nativeElement.contentDocument.getElementsByTagName('head')[0].append(`<link href="${this.cssCode}" rel="stylesheet">`);    
    this.previewFrame.nativeElement.contentDocument.getElementsByTagName('head')[0].append(cssTag);
    this.previewFrame.nativeElement.contentDocument.getElementsByTagName('body')[0].innerHTML = this.project.code.html;
    // this.previewFrame.nativeElement.contentDocument.getElementsByTagName('body')[0].append(`<script>${this.jsCode}</script>`);
    this.previewFrame.nativeElement.contentDocument.getElementsByTagName('body')[0].append(jscrpt);

    console.log("IFrame: \n",this.previewFrame.nativeElement.contentDocument);    
  }

  onCodeUpdated( {code, type} ) {
    switch (type) {
      case 'html':
        if (code !== this.project.code.html){
          this.project.code.html = code;
          console.log("HTML local: ", this.project.code.html);
          console.log("HTML editor: ", code);
          this.updateProject();
        }        
        break;        
      case 'css':
        if (code !== this.project.code.css) {
          this.project.code.css = code;
          console.log("CSS local: ", this.project.code.css);
          console.log("CSS editor: ", code);
          this.updateProject();
        }        
        break;
      case 'javascript':
        if (code !== this.project.code.js) {
          this.project.code.js = code;
          console.log("JavaScript local: ", this.project.code.js);
          console.log("JavaScript editor: ", code);
          this.updateProject();
        }        
        break;    
      default:
        break;
    }
  }

  updateProject() {
    this.makeBlob();
    this.updatingProject = true;
    this.projectsService.updateProject( this.project )
      .subscribe( res => {
        console.log(res);
        this.updatingProject = false;
      }, err => {})
  }

  goBack() {
    if (this.project.folderId == null) {
      this.router.navigate(['../']);
    } else {
      // this.router.navigate([`my/folders/${this.project.folderId}`]);
      this.router.navigate([`my/folders/${this.project.folderId}`]);
    }
  }

}
