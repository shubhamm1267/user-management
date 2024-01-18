import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user-upsert/user.interface';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];
  private usersSubject = new BehaviorSubject<User[]>(this.users);

  constructor(private http: HttpClient) {
    this.http.get<User[]>('assets/user.json').subscribe(initialUsers => {
      this.users = initialUsers.map(user => ({
        ...user,
        id: this.generateUniqueId(),
      }));
      this.usersSubject.next([...this.users]);
    });
  }
  


  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  private generateUniqueId(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uniqueId = '';
    for (let i = 0; i < 8; i++) {
      uniqueId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return uniqueId;
  }


addUser(user: User): void {
  const existingUserIndex = this.users.findIndex(u => u.email === user.email || u.phone === user.phone);
  if (existingUserIndex !== -1) {
    this.users[existingUserIndex] = { ...user, id: this.users[existingUserIndex].id };
    Swal.fire({
      icon: 'info',
      title: 'User Updated',
      text: 'User details already exists | details Updated',
    });
  } else {
    user.id = this.generateUniqueId();
    this.users.push(user);
    Swal.fire({
      icon: 'success',
      title: 'User Added',
      text: 'New user has been added successfully.',
    });
  }
  this.usersSubject.next([...this.users]);
}

  updateUser(user: User): void {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.users[index] = user;
      this.usersSubject.next([...this.users]);
      Swal.fire({
        icon: 'success',
        title: 'User Updated',
        text: 'User details have been updated successfully.',
      });
    }
  }

  deleteUser(user: User): void {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.users.splice(index, 1);
      this.usersSubject.next([...this.users]);
    }
  }

  getUserById(userId: string): User | undefined {
    return this.users.find(user => user.id === userId);
  }
}
