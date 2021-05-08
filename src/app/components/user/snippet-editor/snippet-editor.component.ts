import { Component, OnInit } from '@angular/core';
import { SnippetsService } from '../../../services/snippets.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-snippet-editor',
  templateUrl: './snippet-editor.component.html',
  styleUrls: ['./snippet-editor.component.sass']
})
export class SnippetEditorComponent implements OnInit {

  snippet: any;
  loadingData = true;
  updatingSnippet = false;

  constructor(
    private snippetsService: SnippetsService,
    private activatedRoue: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    
    this.activatedRoue.params.subscribe( params => {
      if(params['snippetId']) {
        this.snippetsService.getSnippet( params['snippetId'])
          .subscribe( res => {
            this.snippet = res;
            this.loadingData = false;
            console.log(res);
          }, err => {
            console.log(err);
          });
      }
    });
  }

  onCodeUpdated( { code } ) {
    this.updatingSnippet = true;
    this.snippet.code = code;
    this.snippetsService.updateSnippet( { _id: this.snippet._id, code: this.snippet.code})
      .subscribe(  (res: any) => {
        this.snippet.lastModified = res.lastModified;
        this.updatingSnippet = false;
      });
  }

  goBack() {
    this.router.navigate(['my/snippets']);
    
  }

}
