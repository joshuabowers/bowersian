import { all, cancelled } from 'redux-saga/effects';
import { loginFlow } from './system/sagas';

export function* sanity() {
  console.log('Running sagas');
  if (yield cancelled()) {
    console.log('Sagas no longer running');
  }
}

export function* rootSaga() {
  yield all([sanity(), loginFlow()]);
}
