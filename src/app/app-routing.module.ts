import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  {
    path: 'repository',
    loadChildren: './repository/repository.module#RepositoryModule',
    canActivate: [AuthGuardService],
  },
  {
    path: 'search',
    loadChildren: './search/search.module#SearchModule',
    canActivate: [AuthGuardService],
  },
  {
    path: 'search/:key',
    loadChildren: './search/search.module#SearchModule',
    canActivate: [AuthGuardService],
  },
  {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfileModule',
    canActivate: [AuthGuardService],
  },
  {
    path: '',
    redirectTo: '/profile',
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: '/profile',
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
