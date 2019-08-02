// Largely adapted from: https://redux-saga.js.org/docs/advanced/NonBlockingCalls.html

import { fork, call, take, put } from 'redux-saga/effects';
import { logIn, logOut } from './actions';
import { Api, Endpoints } from '../rest';
import { Login, User } from './types';

const sessionApi = new Api<User, Login>(
  '/api/session',
  Endpoints.Add | Endpoints.Destroy
);

export function* authenticate(email: string, password: string) {
  try {
    console.log(
      `Attempting authentication with {email: ${email}, password: ${password}}`
    );
    const user = yield call([sessionApi, sessionApi.add], { email, password });
    yield put(
      logIn.success({
        user: user as User,
        loggedIn: true,
        logInFormVisible: false
      })
    );
  } catch (error) {
    yield put(logIn.failure(error));
  }
}

export function* loginFlow() {
  while (true) {
    const {
      payload: { email, password }
    } = yield take(logIn.request);
    yield fork(authenticate, email, password);
    const { payload } = yield take([logOut.request, logIn.failure]);
    console.log(payload);
    // if (typeof payload !== 'string') {
    //   const {
    //     user: { id }
    //   } = payload;
    //   yield call(sessionApi.destroy, id);
    // }
  }
}
