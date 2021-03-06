import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AceEditorModule } from '@postfinance/ngx-ace-editor-wrapper';
import { UserRoutingModule } from './user-routing.module';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { SharedModule } from '../shared/shared.module';

import { ProjectEditorComponent } from './project-editor/project-editor.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { SnippetsComponent } from './snippets/snippets.component';
import { SnippetEditorComponent } from './snippet-editor/snippet-editor.component';
import { SharedComponent } from './shared/shared.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { StorageComponent } from './storage/storage.component';
import { StarredComponent } from './starred/starred.component';
import { TrashComponent } from './trash/trash.component';
import { SnippetCardComponent } from './snippet-card/snippet-card.component';
import { FolderCardComponent } from './folder-card/folder-card.component';
import { NewFolderDialogComponent } from './new-folder-dialog/new-folder-dialog.component';
import { NewProjectDialogComponent } from './new-project-dialog/new-project-dialog.component';
import { NewSnippetDialogComponent } from './new-snippet-dialog/new-snippet-dialog.component';
import { DeleteElementDialogComponent } from './delete-element-dialog/delete-element-dialog.component';
import { ShareElementDialogComponent } from './share-element-dialog/share-element-dialog.component';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { ProfilePicDialogComponent } from './profile-pic-dialog/profile-pic-dialog.component';
import { ImagePipe } from '../../pipes/image.pipe';




@NgModule({
  declarations: [
    ProjectEditorComponent,
    ProjectsComponent,
    ProjectCardComponent,
    SnippetsComponent,
    SnippetEditorComponent,
    SharedComponent,
    AccountSettingsComponent,
    StarredComponent,
    TrashComponent,
    StorageComponent,
    SnippetCardComponent,
    FolderCardComponent,
    NewFolderDialogComponent,
    NewProjectDialogComponent,
    NewSnippetDialogComponent,
    DeleteElementDialogComponent,
    ShareElementDialogComponent,
    CodeEditorComponent,
    ProfilePicDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AceEditorModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
