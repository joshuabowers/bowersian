import { Action } from 'redux';

export interface SystemState {
  loggedIn: boolean;
  token: string;
  userName?: string;
}

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

interface LogInAction extends Action<string> {
  type: typeof LOG_IN;
  payload: SystemState;
}

interface LogOutAction extends Action<string> {
  type: typeof LOG_OUT;
  payload: SystemState;
}

export type SystemActionTypes = LogInAction | LogOutAction;
