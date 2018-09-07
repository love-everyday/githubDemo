import { 
  RouteReuseStrategy,  
  ActivatedRouteSnapshot,
  DetachedRouteHandle
} from "@angular/router";

export class AppRoutingCache implements RouteReuseStrategy {
  public static handlers: {[key: string]: DetachedRouteHandle} = {};
  static getRouteSnapshotUrl(route: ActivatedRouteSnapshot): string {
    return route['_routerState'].url;
  }
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    console.log('shouldDetach');
    return true;
  }
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
    console.log('store', handle);
    AppRoutingCache.handlers[AppRoutingCache.getRouteSnapshotUrl(route)] = handle;
  }
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    console.log('shouldAttach');
    return !!AppRoutingCache.handlers[AppRoutingCache.getRouteSnapshotUrl(route)];
  }
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    console.log('retrieve', route.routeConfig && route.routeConfig.path);
    if (!route.routeConfig) {
      return null;
    }
    const path = AppRoutingCache.getRouteSnapshotUrl(route);
    return AppRoutingCache.handlers[path];
  }
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    console.log('shouldReuseRoute', future, curr);
    return false;
  }
}