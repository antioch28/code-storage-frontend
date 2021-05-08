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
  profilePicUpdate: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private http: HttpClient) { }

  setLoggedUser( user ) {
    this.loggedUser.next( user );
  }

  getLoggedUser() {
    return this.loggedUser.value;
  }

  verifyIfSignedIn( email ) {
    return this.http.get(`${this.api_url}/users/verifyIfSignedIn/${email}`);
  }

  getUserInfo() {
    return this.http.get(`${this.api_url}/users`);
  }

  updateProfilePic( profile ) {
    return this.http.post(`${this.api_url}/users/profile-pic`, profile);
  }

  emitUpdatedProfile( profile ){
    this.profilePicUpdate.next(profile);
  }
}
