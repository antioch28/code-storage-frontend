import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoldersService {

  private api_url = environment.api_url;
  newFolderEmitter: BehaviorSubject<{}> = new BehaviorSubject({});
  currentFolder: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient
  ) { }

  getFolders() {
    return this.http.get(`${this.api_url}/folders`);
  }

  getStarredFolders() {
    return this.http.get(`${this.api_url}/folders/starred`);
  }

  getDeletedFolders() {
    return this.http.get(`${this.api_url}/folders/deleted`);
  }

  getSharedFolders() {
    return this.http.get(`${this.api_url}/folders/shared`);
  }

  getFolder( folderId ) {
    return this.http.get(`${this.api_url}/folders/${folderId}/detail`);
  }

  createFolder( folder ) {
    return this.http.post(`${this.api_url}/folders`, folder);
  }  

  stareFolder( folderId, starred ) {
    return this.http.put(`${this.api_url}/folders/${folderId}/stare`, { starred });
  }

  shareFolder( folderId, sharedWith) {
    return this.http.put(`${this.api_url}/folders/${folderId}/share`, { sharedWith });
  }

  deleteFolder( folderId ) {    
    return this.http.put(`${this.api_url}/folders/${folderId}/trash`, { deleted: true});    
  }

  deletePermFolder( folderId ) {
    return this.http.delete(`${this.api_url}/folders/${folderId}`);
  }

  undeleteFolder( folderId ) {
    return this.http.put(`${this.api_url}/folders/${folderId}/trash`, { deleted: false});
  }

  updateFolder( folder ) {
    return this.http.put(`${this.api_url}/folders/${folder._id}`, folder);
  }

  pushNewFolder( folder ) {
    this.newFolderEmitter.next(folder);
  }

  setCurrentFolder( folderId ) {
    this.currentFolder.next(folderId);
  }
  
}
