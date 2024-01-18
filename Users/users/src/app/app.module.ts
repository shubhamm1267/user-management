import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes  } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon'
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserUpsertComponent } from './user/user-upsert/user-upsert.component';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  { path: 'user/list', component: UserListComponent },
  { path: 'user/upsert', component: UserUpsertComponent },
  { path: '', redirectTo: '/user/list', pathMatch: 'full' },
  { path: '**', redirectTo: '/user/list' }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    UserModule
  ],
  bootstrap: [AppComponent],
  providers:[UserService]
})
export class AppModule { }
