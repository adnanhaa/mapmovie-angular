import {ActionsUnion, ActionTypes} from './app.actions';

const initialState = {
  page : 'shows',     // shows, movies
  mode : 'view',      // view, search
  search : '',
  filters : {
    period : 'week',       // week, day
  }
};

export function appReducer(state = initialState, action: ActionsUnion) {
  switch (action.type) {
    case ActionTypes.Page : return { ...state,
        page: action.payload.page
      };
    case ActionTypes.Mode : return { ...state,
        mode: action.payload.mode
      };
    case ActionTypes.Search : return { ...state,
        search: action.payload.search
      };
    case ActionTypes.Filters : return { ...state,
      filters : {
        ...state.filters,
        period : action.payload.filters.period !== undefined ?
          action.payload.filters.period : state.filters.period
      }
    };
  }
}
