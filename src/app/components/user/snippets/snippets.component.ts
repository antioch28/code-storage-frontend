import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
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
      .subscribe( (res: any) => {
        this.loadingData = false;
        this.snippets = res;
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

  onDeletedSnippet( folderId ) {    
    let index = this.snippets.findIndex( folder => folder._id == folderId);

    if (index > -1) {
      this.snippets.splice(index, 1);
    }
  }

}
