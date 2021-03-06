import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private api_url = environment.api_url;
  newProjectEmitter: BehaviorSubject<{}> = new BehaviorSubject({});

  constructor(
    private http: HttpClient
  ) { }

  getProjects() {
    return this.http.get(`${this.api_url}/projects`);
  }

  getStarredProjects() {
    return this.http.get(`${this.api_url}/projects/starred`);
  }

  getDeletedProjects() {
    return this.http.get(`${this.api_url}/projects/deleted`);
  }

  getSharedProjects() {
    return this.http.get(`${this.api_url}/projects/shared`);
  }

  getProject( projectId ) {
    return this.http.get(`${this.api_url}/projects/${projectId}/detail`);
  }

  createProject( project ) {
    return this.http.post(`${this.api_url}/projects`, project);
  }

  stareProject( projectId, starred ) {
    return this.http.put(`${this.api_url}/projects/${projectId}/stare`, { starred });
  }

  shareProject( projectId, sharedWith) {
    return this.http.put(`${this.api_url}/projects/${projectId}/share`, { sharedWith });
  }

  deleteProject( projectId ) {    
    return this.http.put(`${this.api_url}/projects/${projectId}/trash`, { deleted: true});    
  }

  deletePermProject( projectId ) {
    return this.http.delete(`${this.api_url}/projects/${projectId}`);
  }

  undeleteProject( projectId ) {
    return this.http.put(`${this.api_url}/projects/${projectId}/trash`, { deleted: false});
  }

  updateProject( project ) {
    return this.http.put(`${this.api_url}/projects/${project._id}`, project);
  }

  pushNewProject( project ) {
    this.newProjectEmitter.next(project);
  }

}
