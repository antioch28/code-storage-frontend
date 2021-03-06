import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api_url = environment.api_url;
  userLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private http: HttpClient) { }

  login( user ) {
    return this.http.post(`${this.api_url}/auth/login`, user);
  }

  signin( user ){
    return this.http.post(`${this.api_url}/auth/signin`, user);
  }

  loggedIn() {
    return localStorage.getItem('token') ? true : false;
  }

  setToken( token ) {    
    localStorage.setItem('token', token);
    this.userLoggedIn.next(true);
  }

  getToken() {    
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');    
    this.userLoggedIn.next(false);
  }

}
