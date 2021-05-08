import { Component, OnInit } from '@angular/core';
import { PlansService } from '../../services/plans.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  plans = [];

  constructor(private planesService: PlansService) { }

  ngOnInit(): void {
    this.planesService.getPlans()
      .subscribe( (res: any) => {
        console.log(res);
        this.plans = res;
      }, err => {
        console.log(err);
      });          
  }

}
