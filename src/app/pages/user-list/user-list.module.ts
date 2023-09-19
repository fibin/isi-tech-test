import { NgModule } from '@angular/core';

import { UserListComponent } from './user-list.component';
import { UserListRoutingModule } from './user-list-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    CommonModule,
    UserListRoutingModule,
  ],
})
export class UserListModule { }
