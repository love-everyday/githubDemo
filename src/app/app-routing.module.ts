import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  {
    path: 'repository',
    loadChildren: './repository/repository.module#RepositoryModule'
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
