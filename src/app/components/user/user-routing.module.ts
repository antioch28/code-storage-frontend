import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from '../shared/navigation/navigation.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProjectEditorComponent } from './project-editor/project-editor.component';
import { ProjectsComponent } from './projects/projects.component';
import { SharedComponent } from './shared/shared.component';
import { SnippetEditorComponent } from './snippet-editor/snippet-editor.component';
import { SnippetsComponent } from './snippets/snippets.component';
import { StarredComponent } from './starred/starred.component';
import { StorageComponent } from './storage/storage.component';
import { TrashComponent } from './trash/trash.component';



const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: 'snippets',
        component: SnippetsComponent,
        data: {
          hasToolbar: true,
          hasSidebar: true,
          hasSearchbar: true
        }
      },
      {
        path: 'snippets/:snippetId',
        component: SnippetEditorComponent,
        data: {
          hasToolbar: true,
          hasSidebar: true,
          hasSearchbar: true
        }
      },
      {
        path: 'space',
        component: ProjectsComponent,
        data: {
          hasToolbar: true,
          hasSidebar: true,
          hasSearchbar: true
        }
      },
      {
        path: 'projects/:projectId',
        component: ProjectEditorComponent,
        data: {
          hasToolbar: true,
          hasSidebar: true,
          hasSearchbar: true
        }
      },      
      {
        path: 'starred',
        component: StarredComponent,
        data: {
          hasToolbar: true,
          hasSidebar: true,
          hasSearchbar: true
        }
      },
      {
        path: 'shared',
        component: SharedComponent,
        data: {
          hasToolbar: true,
          hasSidebar: true,
          hasSearchbar: true
        }
      },
      {
        path: 'trash',
        component: TrashComponent,
        data: {
          hasToolbar: true,
          hasSidebar: true,
          hasSearchbar: true
        }
      },
      {
        path: 'settings',
        component: AccountSettingsComponent,
        data: {
          hasToolbar: true,
          hasSidebar: false,
          hasSearchbar: false
        }
      },
      {
        path: 'storage',
        component: StorageComponent,
        data: {
          hasToolbar: true,
          hasSidebar: true,
          hasSearchbar: false
        }
      },
      {
        path: '**',
        redirectTo: 'space'
      }
    ],
    data: {
      hasToolbar: true,
      hasSidebar: true,
      showAuthLinks: false,
      hasSearchbar: true
    }
  }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( routes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule { }
