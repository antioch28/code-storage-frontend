import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.sass']
})
export class ProjectCardComponent implements OnInit {

  @Input() project: any;
  
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  openProject() {
    this.router.navigate([`my/projects/${this.project._id}`]);
  }

}
