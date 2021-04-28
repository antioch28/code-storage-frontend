import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api_url = environment.api_url;
  private logged = localStorage.getItem('token') ? true : false;

  constructor(
    private http: HttpClient) { }

  login( user ) {
    return this.http.post(`${this.api_url}/auth/login`, user);
  }

  signin( user ){
    return this.http.post(`${this.api_url}/auth/signin`, user);
  }

  loggedIn() {
    return this.logged;
  }

  setToken( token ) {    
    localStorage.setItem('token', token);
    this.logged = true;
  }

  getToken() {    
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.logged = false;
  }

}
