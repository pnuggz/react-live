import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from 'routes';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import 'babel-polyfill';


const store = configureStore();

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes />
    </Provider>
  </BrowserRouter>,
  document.getElementById('app'),
);
