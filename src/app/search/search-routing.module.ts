import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { AuthGuardService } from '../service/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    component: SearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
