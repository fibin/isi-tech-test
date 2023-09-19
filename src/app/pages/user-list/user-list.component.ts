import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.interface';
import { Subject, takeUntil } from 'rxjs';
import { TableHeaders } from './models/table-headers.const';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit, OnDestroy {

  tableHeaders = TableHeaders;
  users: User[] = [];

  private destroy$ = new Subject();
  
  constructor(
    private userService: UserService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.userService.getUsers().pipe(
      takeUntil(this.destroy$),
    ).subscribe({
      next: (users: User[]) => this.users = users,
      error: (e) => console.log(e.error),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  trackByTableHeader(_index: number, item: string): string {
    return item;
  }
  
  trackByUser(_index: number, item: User): string {
    return item?.userName;
  }

  createUser(): void {
    this.router.navigate(['user-list/create']);
  }

  edit(user: User): void {
    this.router.navigate(['user-list/edit'], { state: user });
  }
}
