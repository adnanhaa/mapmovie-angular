import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Page} from '../store/app/app.actions';
import {Store} from '@ngrx/store';

@Injectable()
export class HomeResolver implements Resolve<boolean>{
  constructor(private store: Store<any>){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log("HOME");
    return new Observable<boolean>(observer => {
      let page = route.data.page;
      switch (page) {
        case 'movies' :
         // this.store.dispatch(new Page({page: 'movies'}));
          observer.next(true); break;
        default :
         // this.store.dispatch(new Page({page: 'shows'}));
          observer.next(true); break
      }
      observer.next(false);
    });

  }

}
