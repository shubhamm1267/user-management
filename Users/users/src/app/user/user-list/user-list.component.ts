import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user-upsert/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  Reload(){
    window.location.reload();
  }

  editUser(user: User): void {
    this.router.navigate(['/user/upsert'], { queryParams: { id: user.id } });
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user);
  }

  addUser(): void {
    this.router.navigate(['/user/upsert']);
  }
}
