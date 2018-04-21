/* eslint no-restricted-globals: 0 */  // --> OFF
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxPromise from 'redux-promise';
import thunk from 'redux-thunk';
import 'styles/main.scss';

import registerServiceWorker from './registerServiceWorker';
import App from 'containers/App';
import reducers from 'reducers';

const middleware = applyMiddleware(reduxPromise, thunk);
const store = createStore(reducers, middleware);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={history}>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
