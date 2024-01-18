import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'users';
  constructor(private router: Router){

  }
  navigateToUserList(): void {
    this.router.navigate(['/user/list']);
  }
}
