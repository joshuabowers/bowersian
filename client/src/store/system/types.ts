export interface SystemState {
  loggedIn: boolean;
  token: string;
  userName?: string;
}

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

interface LogInAction {
  type: typeof LOG_IN;
  payload: SystemState;
}

interface LogOutAction {
  type: typeof LOG_OUT;
  payload: SystemState;
}

export type SystemActionTypes = LogInAction | LogOutAction;
