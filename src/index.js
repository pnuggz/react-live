import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import 'babel-polyfill';

import HomePage from './components/pages/HomePage'
import Signup from './components/templates/Signup'
import Login from './components/templates/Login'
import Draft from './containers/Draft'

import {  
  checkIndexAuthorization,
  checkAppAuthorization,
} from './lib/check-auth'

const store = configureStore();

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Switch>
        <Route
          exact={true}
          path="/"
          component={HomePage}
          onEntry={checkAppAuthorization(store)}
        />
        <Route
          path='/signup'
          component={Signup}
          onEntry={checkIndexAuthorization(store)}
        />
        <Route
          path='/login'
          component={Login}
          onEntry={checkIndexAuthorization(store)}
        />
        <Route
          path='/draft'
          component={Draft}
          onEntry={checkIndexAuthorization(store)}
        />
      </Switch>
    </Provider>
  </BrowserRouter>,
  document.getElementById('app'),
);
