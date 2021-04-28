import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-folder-card',
  templateUrl: './folder-card.component.html',
  styleUrls: ['./folder-card.component.sass']
})
export class FolderCardComponent implements OnInit {

  @Input() folder: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  openFolder() {
    this.router.navigate([`my/projects/${this.folder._id}`]);
  }

}
