import { createStore, applyMiddleware, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer, AppState } from './reducers';
import { historyChangedMiddleware } from './history';

export const configureStore = (preloadedState?: AppState) => {
  const middlewares: Middleware[] = [historyChangedMiddleware];

  if (process.env.NODE_ENV === 'development') {
    const reduxLogger = require('redux-logger');

    middlewares.push(reduxLogger.logger as Middleware);
  }

  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
  }

  return store;
};
