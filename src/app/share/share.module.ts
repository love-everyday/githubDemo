import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { RepositoryListComponent } from './repository-list/repository-list.component';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule
  ],
  declarations: [RepositoryListComponent],
  exports: [RepositoryListComponent]
})
export class ShareModule { }
