import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search/search.component';
import { ShareModule } from '../share/share.module';

@NgModule({
  imports: [
    CommonModule,
    SearchRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ShareModule
  ],
  declarations: [SearchComponent]
})
export class SearchModule { }
