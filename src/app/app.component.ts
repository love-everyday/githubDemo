import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './service/user.service';
import { ApolloService } from './service/apollo.service';
import { AuthGuardService } from './service/auth-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  isLogin = false;
  userInfo = {avatarUrl: '', login: ""};
  currentRouter = '';
  isShowMenuList = false;
  routes = [
    {path: '/profile', name: 'Profile', icon: 'profile'},
    {path: '/repository', name: 'Repository', icon: 'home'},
    {path: '/search', name: 'Search', icon: 'search'},
  ];
  constructor(private apolloService: ApolloService, 
    private userService: UserService, 
    private router: Router,
    private authGuardService: AuthGuardService
  ) {
    
  }

  ngOnInit() {
    const url = window.location.search;
    if (url.indexOf('code') > 0 && url.indexOf('state') > 0) {   
      this.userService.getAccessToken(url);
      this.router.navigate(['/'], {replaceUrl: true});
    }
    this.checkLogin();
    this.authGuardService.currentPathSubject().subscribe((value: string) => {
      this.currentRouter = value;
    })
  }

  checkLogin() {
    this.userService.isLoginSubject().subscribe((value: boolean) => {
      this.isLogin = value;
      if (value) {
        this.getUserInfo();
      }
    });
  }

  async getUserInfo() {
    const userInfo = await this.apolloService.queryUser();
    if (userInfo) {
      this.userInfo = userInfo;
    }
  }

  loginOrOut() {
    if (this.isLogin) {
      this.userService.logout();
      this.isLogin = false;
    } else {
      this.userService.authorizeGithub();
    }
  }
  login() {
    if (!this.isLogin) {
      this.userService.authorizeGithub();
    }
  }
  logOut(){
    if (this.isLogin) {
      this.userService.logout();
      this.isLogin = false;
      this.userInfo = {avatarUrl: '', login: ""};
    }
  }

  showMenuList() {
    this.isShowMenuList = !this.isShowMenuList;
  }

  routeClick() {
    this.isShowMenuList = false;
  }
}
