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

  loading = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signin() {
    if ( this.user.name != "" && this.user.email && this.user.password != "" && this.user.password == this.user.passwordConfirm) {
      this.loading = true;
      this.authService.signin(this.user)
        .subscribe( (res: any) => {
          if (res.ok) {
            this.loading = false;            
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
