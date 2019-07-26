import { combineReducers } from 'redux';
import system from './system/reducers';
import { historyReducer } from './history/reducers';

export const rootReducer = combineReducers({
  system,
  history: historyReducer
});

export type AppState = ReturnType<typeof rootReducer>;
