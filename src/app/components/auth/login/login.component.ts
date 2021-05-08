import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { NavigationService } from '../../../services/navigation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  user = {
    email: "",
    password: ""
  }

  authErr = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private navigationService: NavigationService,
    private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    if (this.user.email !== '' && this.user.password !== '') {
      this.authService.login(this.user)
        .subscribe( (res: any) => {
          if (res.ok) {
            this.userService.setLoggedUser(res.data);            
            this.authService.setToken(res.token);
            this.router.navigate(['my']);
            this.navigationService.setHasSidebar(true);
          } else {
            console.log(res.msg);

            this.authErr = true;
            setTimeout( () => { this.authErr = false }, 4000);
          }
        }, err => {
          console.log(err);
        });        
    }
  }

}
