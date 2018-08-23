import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from "ng-zorro-antd";

import { RepositoryRoutingModule } from './repository-routing.module';
import { RepositoriesListComponent } from './repositories-list/repositories-list.component';
import { ShareModule } from '../share/share.module';

@NgModule({
  imports: [
    CommonModule,
    RepositoryRoutingModule,
    NgZorroAntdModule,
    ShareModule
  ],
  declarations: [RepositoriesListComponent]
})
export class RepositoryModule { }
