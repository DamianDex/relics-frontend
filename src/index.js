import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Header from "./Header";
import { Router } from 'react-router'
import { createBrowserHistory } from 'history'
import { createStore } from 'redux';
import { Provider } from 'react-redux'

import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

const loginReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, logged: true };
    case 'LOGOUT':
      return { ...state, logged: false };
    default:
      return { ...state, persistedState };
    }
};

console.log(sessionStorage.getItem('jwtToken'));

const persistedState = sessionStorage.getItem('jwtToken') ? {logged: true} : {logged: false}

const store = createStore(
	  loginReducer,
	  persistedState
)

export const history = createBrowserHistory();

ReactDOM.render((
	<Provider store={store}>
		<Router history={history}>
       		<App/>
       	</Router>
    </Provider>
), document.getElementById('root'))