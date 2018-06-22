import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import logger from 'redux-logger';

import { createStore, applyMiddleware } from 'redux';

import App from './app'
import Styles from './styles.css';

const rootReducer = (state, action) => ({});

const middleware = applyMiddleware( logger );
const store = createStore( rootReducer, middleware );

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={ store }>
      <App />
    </Provider>,
    document.getElementById( 'root' )
  );
});
