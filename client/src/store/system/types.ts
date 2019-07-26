import { Action } from 'redux';

export interface SystemState {
  error?: string;
  loggedIn: boolean;
  token: string;
  userName?: string;
}
