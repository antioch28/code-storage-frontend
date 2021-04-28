import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SnippetsService {

  private api_url = environment.api_url;
  newSnippetEmitter: BehaviorSubject<{}> = new BehaviorSubject({});

  constructor(
    private http: HttpClient
  ) { }

  getSnippets() {
    return this.http.get(`${this.api_url}/snippets`);
  }

  getStarredSnippets() {
    return this.http.get(`${this.api_url}/snippets/starred`);
  }

  getDeletedSnippets() {
    return this.http.get(`${this.api_url}/snippets/deleted`);
  }

  getSharedSnippets() {
    return this.http.get(`${this.api_url}/snippets/shared`);
  }

  getSnippet( snippetId ) {
    return this.http.get(`${this.api_url}/snippets/${snippetId}`);
  }

  createSnippet( snippet ) {
    return this.http.post(`${this.api_url}/snippets`, snippet);
  }

  stareSnippet( projectId ) {
    return this.http.put(`${this.api_url}/snippets/${projectId}/stare`, {});
  }

  deleteSnippet( project ) {
    if ( project.deleted ) {
      return this.http.delete(`${this.api_url}/snippets/${project._id}`);
    } else {
      return this.http.put(`${this.api_url}/snippets/${project._id}/trash`, {});
    }
  }

  updateSnippet( snippet ) {
    return this.http.put(`${this.api_url}/snippets/${snippet._id}`, snippet);
  }

  pushNewSnippet( snippet ) {
    this.newSnippetEmitter.next(snippet);
  }
  
}
