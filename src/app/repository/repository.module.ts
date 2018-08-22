import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from "ng-zorro-antd";

import { RepositoryRoutingModule } from './repository-routing.module';
import { RepositoriesListComponent } from './repositories-list/repositories-list.component';

@NgModule({
  imports: [
    CommonModule,
    RepositoryRoutingModule,
    NgZorroAntdModule
  ],
  declarations: [RepositoriesListComponent]
})
export class RepositoryModule { }
