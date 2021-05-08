import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnInit } from '@angular/core';
import { NavigationService } from './services/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'code-storage-frontend';

  @HostBinding('class') className = '';

  constructor(
    private navigationService: NavigationService,
    private overlayContainer: OverlayContainer
  ) {}

  ngOnInit() {
    this.navigationService.currentTheme.subscribe( theme => {
      this.className = theme + '-theme';

      if (theme === 'dark') {
        this.overlayContainer.getContainerElement().classList.add('dark-theme');
        this.overlayContainer.getContainerElement().classList.remove('light-theme');
      } else {
        this.overlayContainer.getContainerElement().classList.remove('dark-theme');
        this.overlayContainer.getContainerElement().classList.add('light-theme');
        }
    })
  }

  
}
