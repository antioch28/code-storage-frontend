import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  toggleSidebar: BehaviorSubject<boolean> = new BehaviorSubject(false);
  hasSidebar: BehaviorSubject<boolean> = new BehaviorSubject(false);
  hasSidebarMenu: BehaviorSubject<boolean> = new BehaviorSubject(true);
  showSidebarMenu: BehaviorSubject<boolean> = new BehaviorSubject(true);
  hasSearchbar: BehaviorSubject<boolean> = new BehaviorSubject(false);
  showAuthLinks: BehaviorSubject<boolean> = new BehaviorSubject(true);
  showUserMenu: BehaviorSubject<boolean> = new BehaviorSubject(false);

  currentTheme: BehaviorSubject<string> = new BehaviorSubject('light');

  constructor() { }

  toggle( toggle: boolean) {
    console.log("Entró a Toggle!");
    this.toggleSidebar.next(toggle);
  }

  setHasSidebar( show ) {
    console.log({show});
    this.hasSidebar.next(show);
  }

  setHasSidebarMenu( show ) {
    console.log("Entró a setHasSidebarMenu", {show});
    this.hasSidebarMenu.next(show);
  }

  setShowSidebarMenu( show ) {
    console.log("Entró a setShowSidebarMenu", {show});
    this.showSidebarMenu.next(show);
  }

  setHasSearchbar( show ) {
    console.log({show});
    this.hasSearchbar.next(show);
  }

  setShowAuthLinks( show ) {
    console.log({show});
    this.showAuthLinks.next(show);
  }

  setShowUserMenu( show ) {
    console.log({show});
    this.showUserMenu.next(show);
  }

  setTheme( theme ) {
    this.currentTheme.next(theme);
  }

}
