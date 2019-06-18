import { createBrowserHistory } from 'history';
import { Middleware } from 'redux';
import { navigate } from './actions';

export const history = createBrowserHistory();

export const historyChangedMiddleware: Middleware = store => {
  history.listen((location, historyAction) => {
    store.dispatch(navigate(location, historyAction));
  });
  return next => action => next(action);
};
