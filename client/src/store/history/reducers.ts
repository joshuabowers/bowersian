import { HistoryState, NAVIGATE, HistoryActionTypes } from './types';
import { history } from './index';

// TODO: get curent path location and set here.
const initialState: HistoryState = {
  location: history.location,
  action: 'REPLACE'
};

export function historyReducer(
  state = initialState,
  action: HistoryActionTypes
): HistoryState {
  switch (action.type) {
    case NAVIGATE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
