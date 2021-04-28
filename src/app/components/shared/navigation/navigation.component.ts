import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit {

  showFiller = false;
  manualToggle = false;
  hasSidebar = false;
  showSearchbar = false;
  showAuthLinks = false;

  constructor(
    private navigationService: NavigationService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe( data => {      
      if (data.hasSidebar){
        this.hasSidebar = data.hasSidebar;        
      }

      if (data.showAuthLinks) {
        this.showAuthLinks = data.showAuthLinks;
      }

      if (data.hasSearchbar) {
        this.showSearchbar = data.hasSearchbar;
      }
    }, err => console.log(err));
  }

  toggleSidebar() {
    this.showFiller = !this.showFiller;
    this.navigationService.toggle(this.showFiller);
  }

  toggleSearchbar() {
    this.showSearchbar = !this.showSearchbar;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['../']);
  }

}
