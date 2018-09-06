import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  private _currentPathSubject = new BehaviorSubject('');

  constructor() { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let path = route.routeConfig.path;
    if (path === 'search/:key') {
      path = 'search';
    }
    this._currentPathSubject.next('/' + path);
    return true;
  }

  currentPathSubject() {
    return this._currentPathSubject;
  }
}
