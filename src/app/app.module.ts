import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from "apollo-angular-link-http";
import { NgZorroAntdModule, NZ_I18N, zh_CN } from "ng-zorro-antd";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppRoutingCache } from "./app-routing.cache";

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    AppRoutingModule,
    NgZorroAntdModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }, {provide: RouteReuseStrategy, useClass: AppRoutingCache}],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor() {
    
  }
}
