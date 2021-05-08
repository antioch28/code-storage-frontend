import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PlansService {

  private api_url = environment.api_url;

  constructor(
    private http: HttpClient
  ) { }

  getPlans() {
    return this.http.get(`${this.api_url}/plans`);
  }

}
