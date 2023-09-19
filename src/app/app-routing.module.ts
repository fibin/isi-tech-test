import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTE_PATH } from './models/routes.const';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageIsForbiddenComponent } from './pages/page-is-forbidden/page-is-forbidden.component';

const routes: Routes = [
  {
    path: ROUTE_PATH.userList,
    children: [
    {
      path: '',
      loadChildren: () => import('./pages/user-list/user-list.module').then(m => m.UserListModule),
    },
    {
      path: ROUTE_PATH.create,
      loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule),
    },
    {
      path: ROUTE_PATH.edit,
      loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule),
    },
   ]
  },
  {
    path: ROUTE_PATH.forbidden,
    component: PageIsForbiddenComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: ROUTE_PATH.userList,
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
