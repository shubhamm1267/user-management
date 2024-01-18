import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule,Routes } from '@angular/router';
import {MatIconModule} from '@angular/material/icon'
import { UserListComponent } from './user-list/user-list.component';
import { UserUpsertComponent } from './user-upsert/user-upsert.component';
import { HttpClientModule } from '@angular/common/http';

const userRoutes: Routes = [
  { path: 'list', component: UserListComponent },
  { path: 'upsert', component: UserUpsertComponent },
];

@NgModule({
  declarations: [
    UserListComponent,
    UserUpsertComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    RouterModule.forChild(userRoutes)
  ],
  exports: [
    UserListComponent,
    UserUpsertComponent
  ],
})
export class UserModule { }
