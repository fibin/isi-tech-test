import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../models/user.interface';
import { userMoch } from '../pages/user-list/models/users-moch.const';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [];

  getUsers(): Observable<User[]> {
    if (this.users?.length <= 0) {
      this.users = userMoch;
    }
    return of(this.users);
  }

  deleteUser(user: User): Observable<void> {
    const id = this.users.indexOf(user);
    this.users.splice(id, 1);
    return of(null);
  }

  createUser(user: User): Observable<any> {
    const findDuplicate = this.users.filter((value: User) => value?.userName === user?.userName);
    if (findDuplicate?.length > 0) {
      const err = new Error('user already exists');
      return throwError(() => err);
    } else {
      this.users.push(user);
      return of(null);
    }
  }

  updateUser(user: User): Observable<void> {
    const id = this.users.findIndex((value: User) => value.userName === user.userName);
    this.users[id] = user;
    return of(null);
  }

  getAuthDetails(): string {
    return localStorage.getItem('token');
  }
}
