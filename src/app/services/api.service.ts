import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Api, ApiConstants, ApiFilters} from './api-constants';
import {Observable} from 'rxjs';
import Data from '../models/Data';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient) {}

  /*
   * Fetch data for page and period with updateing store
   * @param {string} page
   * @param {string} period
   * @return {function} The that dispatch action on the thunk middleware and store
   */
  fetchDataFor(page: string, period: string): Observable<Data> {
    return this.fetchData(this._getUrl(page, period));
  }

  /*
   * Fetch search data for page by value with updateing store
   * @param {string} page
   * @param {string} value
   * @return {function} The that dispatch action on the thunk middleware and store
   */
  searchData(page: string, value: string): Observable<Data> {
    return this.fetchData(this._getSearchUrl(page, value));
  }

  /*
   * Fetch keywords data and return promise
   * @param {string} value
   * @return {Object} Promise
   */
  fetchKeywords(value: string): Observable<Data> {
    return this.httpClient.get<Data>(Api.KEYWORD_SEARCH + value);
  }

  /*
   * Fetch item data by type and return promise
   * @param {type} string
   * @param {number} id
   * @return {Object} Promise
   */
  fetchItemDetails(type: string, id: string): Observable<Data> {
    if (type === 'shows') {
      return this._fetchShow(id);
    } else if (type === 'movies') {
      return this._fetchMovie(id);
    }
    return null;
  }

  /*
   * Fetch videos by item type and return promise
   * @param {type} string
   * @param {number} id
   * @return {Object} Promise
   */
  fetchItemVideos(type: string, id: string): Observable<Data> {
    if (type === 'shows') {
      return this._fetchShowVideos(id);
    } else if (type === 'movies') {
      return this._fetchMovieVideos(id);
    }
    return null;
  }

  /*
   * Fetch TV Show data and return promise
   * @param {number} id
   * @return {Object} Promise
   */
  _fetchShow(id: string): Observable<Data> {
    const url = Api.TV + id + ApiConstants.API_KEY + ApiConstants.LANGUAGE_DEFAULT;
    return this.httpClient.get<Data>(url);
  }

  /*
   * Fetch Movie item data and return promise
   * @param {number} id
   * @return {Object} Promise
   */
  _fetchMovie(id: string): Observable<Data> {
    const url = Api.MOVIE + id + ApiConstants.API_KEY + ApiConstants.LANGUAGE_DEFAULT;
    return this.httpClient.get<Data>(url);
  }

  /*
   * Fetch TV Show item videos data and return promise
   * @param {number} id TV Show id
   * @return {Object} Promise
   */
  _fetchShowVideos(id: string): Observable<Data> {
    const url = Api.TV + id + ApiConstants.VIDEOS + ApiConstants.API_KEY + ApiConstants.LANGUAGE_DEFAULT;
    return this.httpClient.get<Data>(url);
  }

  /*
   * Fetch Movie item videos data and return promise
   * @param {number} id TV Show id
   * @return {Object} Promise
   */
  _fetchMovieVideos(id: string): Observable<Data> {
    const url = Api.MOVIE + id + ApiConstants.VIDEOS + ApiConstants.API_KEY + ApiConstants.LANGUAGE_DEFAULT;
    return this.httpClient.get<Data>(url);
  }


  /*
   * Clean filters - prevent unwanted filters in the store
   * Allowed filters defined in ApiFilters object
   * @return {Object} filter
   */
  cleanFilters(filters: object) {
    const cleaned = {};
    for (const key of Object.keys(filters)) {
      if (ApiFilters.hasOwnProperty(key)) {
        if (ApiFilters[key].includes(filters[key])) {
          cleaned[key] = filters[key];
        }
      }
    }
    return cleaned;
  }

  /*
   * private helper function
   * @param {string} page
   * @param {string} period
   * @return {String} url
   */
  _getUrl(page: string, period: string) {
    if (page === 'shows') {
      if (period === 'day') { return Api.TV_DAY_TRENDING; }
      return Api.TV_WEEK_TRENDING;
    }
    if (period === 'day') { return Api.MOVIE_DAY_TRENDING; }
    return Api.MOVIE_WEEK_TRENDING;
  }


  /*
   * private helper function
   * @param {string} page
   * @param {string} value
   * @return {String} url
   */
  _getSearchUrl(page: string, value: string) {
  if (page === 'shows') { return Api.TV_SEARCH + value; }
  return Api.MOVIE_SEARCH + value;
}


  /*
   * Middleware dispatcher function
   * Instead fetch use cross-fetch or Axios
   * @param {string} url
   * @return {Function} MiddlewareFunction/Object(redux action)
   */
  fetchData(url: string): Observable<Data> {
    return this.httpClient.get<Data>(url);
  }

}
