import { all, cancelled } from 'redux-saga/effects';

export function* sanity() {
  console.log('Running sagas');
  if (yield cancelled()) {
    console.log('Sagas no longer running');
  }
}

export function* rootSaga() {
  yield all([sanity()]);
}
