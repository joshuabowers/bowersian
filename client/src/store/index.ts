import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer, AppState } from './reducers';

export const configureStore = (preloadedState?: AppState) => {
  const middlewares = [];

  if (process.env.NODE_ENV === 'development') {
    const logger = require('redux-logger');

    middlewares.push(logger);
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
