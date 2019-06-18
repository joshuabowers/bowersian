import { NAVIGATE, HistoryActionTypes } from './types';
import { Location, Action } from 'history';

export function navigate(
  location: Location,
  action: Action
): HistoryActionTypes {
  return {
    type: NAVIGATE,
    payload: {
      location: location,
      action: action
    }
  };
}
