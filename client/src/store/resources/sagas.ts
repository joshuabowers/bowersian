import { navigate } from 'store/history/actions';
import { IHistoryState } from 'store/history/types';
import { Action } from 'redux-act';
import { takeLatest, call, put } from 'redux-saga/effects';
import { Article } from './types';
import { Api } from 'store/rest';
import pathToRegexp from 'path-to-regexp';

const resourceApi = new Api<Article>('/api/articles');
const fromPath = pathToRegexp('/:resource/:optional([\\d]{2,4})*/:id?');

type ResourceAction = Action<IHistoryState>;

export function* onNavigation() {
  yield takeLatest(navigate, requestResource);
}

export function* requestResource(action: ResourceAction) {
  const location = action.payload.location;
  // location.
  console.info(location);
  console.info('fromPath:', fromPath);
  console.info('fromPath result:', fromPath.exec(location.pathname));
  const pathMatch = fromPath.exec(location.pathname);
  if (pathMatch) {
    const [, , optional, id] = pathMatch;
    let result;
    if (!id) {
      result = yield call([resourceApi, resourceApi.browse], optional);
    } else {
      const slug = [optional, id].join('/');
      result = yield call([resourceApi, resourceApi.read], slug);
    }
    if (result) {
      console.log(result);
      // yield put( )
    }
  }
}
