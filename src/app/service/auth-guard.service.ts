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
    this._currentPathSubject.next(state.url);
    return true;
  }

  currentPathSubject() {
    return this._currentPathSubject;
  }
}
