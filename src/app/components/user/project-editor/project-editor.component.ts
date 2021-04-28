import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import  * as ace from "ace-builds";
import { ActivatedRoute } from '@angular/router';
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

  project: any = {};
  
  htmlOptions = {
    theme: 'vs-dark',
    language: 'html',
    minimap: { enabled: false}
  };

  cssOptions = {
    theme: 'vs-dark',
    language: 'css'    
  };

  jsOptions = {
    theme: 'vs-dark',
    language: 'javascript'    
  };

  htmlCode = '<div>\nHello World from Monaco Editor!\n</div>\n';
  cssCode = 'div {background-color: red;color: white;}';
  jsCode = 'alert("Hello world from Monaco Editor!");';


  constructor(
    private activatedRoute: ActivatedRoute,
    private projectsService: ProjectsService
  ) { }

  ngAfterViewInit(): void {

    const htmlEditor = ace.edit(this.html.nativeElement);
    const cssEditor = ace.edit(this.css.nativeElement);
    const jsEditor = ace.edit(this.js.nativeElement);

    this.activatedRoute.params.subscribe( params => {
      console.log(params);

      if (params.projectId) {
        this.projectsService.getProject(params.projectId)
          .subscribe( res => {
            this.project = res;

            htmlEditor.session.setValue(this.project.code.html);
            cssEditor.session.setValue(this.project.code.css);
            jsEditor.session.setValue(this.project.code.js);

            htmlEditor.setTheme('ace/theme/twilight');
            htmlEditor.session.setMode('ace/mode/html');
            cssEditor.setTheme('ace/theme/twilight');
            cssEditor.session.setMode('ace/mode/css');
            jsEditor.setTheme('ace/theme/solarized_dark');
            jsEditor.session.setMode('ace/mode/javascript');
          }, err => {});
      }
    });

    // ace.config.set('basePath', '../../../assets/js/ace-builds/src-noconflict');
    /* const htmlEditor = ace.edit(this.html.nativeElement);
    const cssEditor = ace.edit(this.css.nativeElement);
    const jsEditor = ace.edit(this.js.nativeElement); */

    /* htmlEditor.session.setValue("<h1>Ace Editor works great in Angular!</h1>");
    cssEditor.session.setValue("h1 { color: red; background-color: green;}");
    jsEditor.session.setValue("function hello() { console.log('Hola Mundo!');}"); */
    
    /* htmlEditor.setTheme('dracula', () => {
      console.log(this);
    }); */
    /* htmlEditor.setTheme('ace/theme/twilight');
    htmlEditor.session.setMode('ace/mode/html');
    cssEditor.setTheme('ace/theme/twilight');
    cssEditor.session.setMode('ace/mode/css');
    jsEditor.setTheme('ace/theme/solarized_dark');
    jsEditor.session.setMode('ace/mode/javascript'); */

    
    console.log('Ace config: ', ace.config.all());
    
  }

  makeBlob(){    

    let blob = new Blob([this.project.code.html], {type: 'text/html'});
    console.log('Blob: ', blob);

    const cssUrl = URL.createObjectURL(new Blob([this.project.code.css], {type: 'text/css'}));
    const jsUrl = URL.createObjectURL(new Blob([this.project.code.js], {type:'text/javascript'}));

    let jscrpt: HTMLScriptElement = document.createElement('script');
    // jscrpt.innerText = this.jsCode;
    jscrpt.innerText = this.project.code.js;

    let cssTag: HTMLStyleElement = document.createElement('style');
    cssTag.innerText = this.project.code.css;

    // this.previewFrame.nativeElement.src = URL.createObjectURL(blob);
    /* this.previewFrame.nativeElement.contentDocument.getElementsByTagName('head')[0].append(`<link href="${this.cssCode}" rel="stylesheet">`); */
    this.previewFrame.nativeElement.contentDocument.getElementsByTagName('head')[0].append(cssTag);
    this.previewFrame.nativeElement.contentDocument.getElementsByTagName('body')[0].innerHTML = this.project.code.html;
    /* this.previewFrame.nativeElement.contentDocument.getElementsByTagName('body')[0].append(`<script>${this.jsCode}</script>`); */
    this.previewFrame.nativeElement.contentDocument.getElementsByTagName('body')[0].append(jscrpt);

    console.log(this.previewFrame.nativeElement.contentDocument);
    
    console.log(this.jsCode);
    console.log(this.cssCode);
  }

}
