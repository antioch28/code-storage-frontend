import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  toggleSidebar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  toggle( toggle: boolean) {
    this.toggleSidebar.next(toggle);
  }

}
