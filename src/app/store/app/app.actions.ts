import {Action} from '@ngrx/store';

export enum ActionTypes {
  Page = 'Page',
  Mode = 'Mode',
  Search = 'Search',
  Filters = 'Filters',
}

export class Page implements Action  {
  readonly type = ActionTypes.Page;
  constructor(
    public payload: {page: string}) {
  }
}
export class Mode implements Action {
  readonly type = ActionTypes.Mode;
  constructor(
    public payload: {mode: string}
  ) {}
}
export class Search implements Action {
  readonly type = ActionTypes.Search;
  constructor(
    public payload: {search: string}
  ) {}
}
export class Filters implements Action {
  readonly type = ActionTypes.Filters;

  constructor(
    public payload: { filters: { period: string } }
  ) {}
}

export type ActionsUnion = Page | Mode | Search | Filters;
