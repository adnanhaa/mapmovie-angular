import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import Data from '../models/Data';
import {Injectable} from '@angular/core';
import {ApiService} from '../services/api.service';

@Injectable()
export class DetailsVideosResolver implements Resolve<Data>{
  private page: string;
  private id: string;
  constructor(private apiService: ApiService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Data> {
    this.page = route.data.page;
    this.id = route.params.id;
    //console.log(this.page, this.id);
    if (this.id !== undefined && this.page !== undefined) {
      return this.apiService.fetchItemVideos(this.page, this.id);
    }
    return undefined;
  }
}
