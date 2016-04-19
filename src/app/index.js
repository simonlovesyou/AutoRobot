import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import reducers from '../../app/reducers/'
import actions from '../../app/actions/';
import App from '../../app/components/App/App.js';
import createLogger from 'redux-logger';

const store = createStore(reducers, applyMiddleware(thunk, createLogger()));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
