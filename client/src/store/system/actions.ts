import { SystemState, LOG_IN, LOG_OUT, SystemActionTypes } from './types';

export function logIn(newSession: SystemState): SystemActionTypes {
  return {
    type: LOG_IN,
    payload: newSession
  };
}

export function logOut(currentSession: SystemState): SystemActionTypes {
  return {
    type: LOG_OUT,
    payload: currentSession
  };
}
