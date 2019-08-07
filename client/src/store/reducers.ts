import { combineReducers } from 'redux';
import system from './system/reducers';
import history from './history/reducers';
import articles from './resources/reducers';

export const rootReducer = combineReducers({
  system,
  history,
  articles
});

export type AppState = ReturnType<typeof rootReducer>;
