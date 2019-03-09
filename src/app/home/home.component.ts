import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../services/api.service';
import {select, Store} from '@ngrx/store';
import {Filters, Mode, Page, Search} from '../store/app/app.actions';
import {Observable, Subscription} from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  page: string;
  mode: string;
  search: string;
  filters: {
    period: string
  };
  isLoading: boolean;
  items: Array<any> = [];
  error = null;
  suggestions: Array<any> = [];
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private store: Store<any>) {

    this.subscription = this.store.pipe(select('app')).subscribe(app => {
      if (app !== undefined) {
        this.page = app.page;
        this.mode = app.mode;
        this.search = app.search;
        this.filters = app.filters;
      }
    });
  }
  ngOnInit() {
     this.route.paramMap.subscribe(params => {
      this.setPage(params.get('page'));
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  // export to HomeResolver
  async setPage(page) {
    let needLoad = false;
    if (page !== undefined) {
      if (this.page !== page) {
        needLoad = true;
      }
      switch (page) {
        case 'movies' :
          await this.store.dispatch(new Page({page: 'movies'}));
          break;
        default :
          await this.store.dispatch(new Page({page: 'shows'}));
      }
    }
    if (needLoad) {
      this.prepareFetchData(null);
    }
  }

  handleSearch(value) {
    if (value.length >= 3) {
      this.store.dispatch(new Mode({mode: 'search'}));
      this.store.dispatch(new Search({search: value}));
      this.prepareFetchData(value);
    } else {
      const reset = this.mode !== 'view';
      this.store.dispatch(new Mode({mode: 'view'}));
      this.suggestions = [];
      if (reset || value.length === 0) {
        this.prepareFetchData(null);
      }
    }
  }

  handleSuggestions(value) {
    // console.log('HOME SUGG CLICK: ' + value);
    if (value.length >= 3) {
      this.apiService.fetchKeywords(value)
        .subscribe(data => {
          this.suggestions = (data.results.length > 5 ? data.results.slice(0, 5) : data.results);
          console.log(this.suggestions);
        });
    }
  }

  prepareFetchData(value) {
    if (this.mode === 'view') {
      this.fetchData();
    } else if (this.mode === 'search') {
      if (value !== null) {
        this.searchData(value);
      } else {
        console.log(this.search);
        this.searchData(this.search);
      }
    }
  }

  fetchData() {
    this.isLoading = true;
    this.apiService.fetchDataFor(this.page, this.filters.period).subscribe(data => {
        this.items = data.results;
        this.isLoading = false;
         // console.log(data.results);
    });
  }
  searchData(value: string) {
    this.isLoading = true;
    this.apiService.searchData(this.page.toString(), value).subscribe(data => {
        this.items = data.results;
        this.isLoading = false;
         // console.log(data.results);
    });
  }

  setPeriod(period: string) {
    if (this.filters.period !== period) {
      this.store.dispatch(new Filters({filters: {period}}));
      if (this.mode === 'view') {
        this.prepareFetchData(null);
      }
    }
  }

}
