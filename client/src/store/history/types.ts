import { Action } from 'redux';
import * as History from 'history';

export interface HistoryState {
  location: History.Location;
  action: History.Action;
}

export const NAVIGATE = 'NAVIGATE';

interface NavigateAction extends Action<string> {
  type: typeof NAVIGATE;
  payload: HistoryState;
}

export type HistoryActionTypes = NavigateAction;
