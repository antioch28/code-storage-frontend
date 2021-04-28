import { Component, OnInit } from '@angular/core';
import { SnippetsService } from '../../../services/snippets.service';

@Component({
  selector: 'app-snippets',
  templateUrl: './snippets.component.html',
  styleUrls: ['./snippets.component.sass']
})
export class SnippetsComponent implements OnInit {

  snippets = [];
  loadingData = true;

  constructor(
    private snippetsService: SnippetsService
  ) { }

  ngOnInit(): void {
    this.snippetsService.getSnippets()
      .subscribe( res => {
        console.log(res);
        this.loadingData = false;
      }, err => {
        console.log(err);
      });

      this.snippetsService.newSnippetEmitter
        .subscribe( snippet => {
          this.snippets.push(snippet);
        }, err => {
          console.log(err);
        });
  }

}
