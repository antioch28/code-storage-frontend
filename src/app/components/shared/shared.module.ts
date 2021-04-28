import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/modules/material/material.module';

import { LoadingComponent } from './loading/loading.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [
    LoadingComponent,
    NavigationComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports:[
    LoadingComponent,
    NavigationComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
