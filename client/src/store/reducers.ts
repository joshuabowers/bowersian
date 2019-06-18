import { combineReducers } from 'redux';
import { systemReducer } from './system/reducers';
import { historyReducer } from './history/reducers';

export const rootReducer = combineReducers({
  system: systemReducer,
  history: historyReducer
});

export type AppState = ReturnType<typeof rootReducer>;
