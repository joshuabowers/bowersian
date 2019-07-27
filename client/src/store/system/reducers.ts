import { SystemState } from './types';
import { createReducer } from 'redux-act';
import { logIn, logOut } from './actions';

const initialState: SystemState = {
  error: undefined,
  loggedIn: false,
  user: undefined,
  login: undefined
};

const reducer = createReducer<SystemState>({}, initialState);

reducer.on(logIn.request, (state, payload) => initialState);
reducer.on(logIn.success, (state, payload) => ({
  ...payload
}));
reducer.on(logIn.failure, (state, payload) => ({
  ...state,
  error: payload
}));

reducer.on(logOut.request, (state, payload) => initialState);
reducer.on(logOut.success, (state, payload) => ({
  ...payload
}));
reducer.on(logOut.failure, (state, payload) => ({
  ...state,
  error: payload
}));

export default reducer;
