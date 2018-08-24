import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ShareModule } from '../share/share.module';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NgZorroAntdModule,
    ShareModule
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
