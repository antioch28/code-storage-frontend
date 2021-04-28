import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SigninComponent implements OnInit {

  user = {
    name: "",
    email: "",
    password: "",
    passwordConfirm: ""
  };

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signin() {
    if ( this.user.name != "" && this.user.email && this.user.password != "" && this.user.password == this.user.passwordConfirm) {
      this.authService.signin(this.user)
        .subscribe( (res: any) => {
          if (res.ok) {
            console.log(res);
            this.userService.setLoggedUser(res.data);            
            this.authService.setToken(res.token);
            this.router.navigate(['my']);
          } else {
            console.log(res.msg);
          }
        }, err => {
          console.log(err);
        }); 
    }
  }

}
