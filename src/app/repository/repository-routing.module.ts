import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RepositoriesListComponent } from './repositories-list/repositories-list.component';
import { AuthGuardService } from '../service/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    component: RepositoriesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepositoryRoutingModule { }
