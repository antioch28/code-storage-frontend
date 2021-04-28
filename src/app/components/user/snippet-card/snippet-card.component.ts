import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-snippet-card',
  templateUrl: './snippet-card.component.html',
  styleUrls: ['./snippet-card.component.sass']
})
export class SnippetCardComponent implements OnInit {

  @Input() snippet: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  openSnippet() {
    this.router.navigate([`my/snippets/${this.snippet._id}`]);
  }

}
