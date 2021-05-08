import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation.service';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit {

  loggedUser: any;
  
  showFiller = false;
  manualToggle = false;
  hasSidebar = false;
  hasSearchbar = false;
  showSearchbar = false;
  showAuthLinks = true;
  showUserMenu = false;

  constructor(
    private navigationService: NavigationService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    if(this.authService.loggedIn()) {
      this.hasSidebar = true;
      this.showUserMenu = true;
      this.hasSearchbar = true;
      this.showAuthLinks = false;

      this.userService.getUserInfo().subscribe( user => {
        this.loggedUser = user;
        console.log(user);
      }, err => {
        console.log(err);
      });

      this.userService.profilePicUpdate.subscribe( profile => {
        if (profile !== '') {
          this.loggedUser.profile = profile;
        }
      });
    }

  }

  toggleSidebar() {
    this.showFiller = !this.showFiller;
    this.navigationService.toggle(this.showFiller);
  }

  toggleSearchbar() {
    this.showSearchbar = !this.showSearchbar;
  }

  logout() {
    this.showAuthLinks = true;
    this.showUserMenu = false;
    this.authService.logout();
    this.router.navigate(['../']);
  }

}
