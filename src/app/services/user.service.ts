import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api_url = environment.api_url;
  loggedUser: BehaviorSubject<{}> = new BehaviorSubject({});

  constructor(private http: HttpClient) { }

  setLoggedUser( user ) {
    this.loggedUser.next( user );
  }

  getLoggedUser() {
    return this.loggedUser.value;
  }
}
