import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import Data from '../models/Data';
import {Injectable} from '@angular/core';
import {ApiService} from '../services/api.service';
import {catchError} from 'rxjs/operators';

@Injectable()
export class DetailsResolver implements Resolve<Data>{
  private page: string;
  private id: string;
  constructor(private apiService: ApiService, private router: Router,){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Data> {
    this.page = route.data.page;
    this.id = route.params.id;
    if (this.id !== undefined && this.page !== undefined) {
      return this.apiService.fetchItemDetails(this.page, this.id)
       /* .pipe(catchError((err) => {
          //handle Error;
        }));*/
    }
    return undefined;
  }

}
