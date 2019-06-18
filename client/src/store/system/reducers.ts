import { SystemState, SystemActionTypes, LOG_IN, LOG_OUT } from './types';

const initialState: SystemState = {
  loggedIn: false,
  token: '',
  userName: ''
};

export function systemReducer(
  state = initialState,
  action: SystemActionTypes
): SystemState {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        ...action.payload
      };
    case LOG_OUT:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
