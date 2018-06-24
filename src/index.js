import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Header from "./Header";
import { Router } from 'react-router'
import { createBrowserHistory } from 'history'
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'

import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap/dist/css/glyphicon.css';

let state;

function reducer(state = [], action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, logged: action.logged };
    case 'SEARCH_ROUTE':
    	return { ...state, route_searched: action.dir_searched, route_buffer: parseFloat(action.route_buffer) }
    case 'ROUTE_RELICS':
    	return { ...state, route_relics: action.route_relics}
    case 'PROCESSING_RELICS':
        return {...state, pending: action.pending}
    case 'ROUTE_RELICS_FOUND':
        return {...state, found_relics: action.found_relics, found_buffer: action.found_buffer}
    default:
      return { ...state, persistedState };
    }
};

const persistedState = sessionStorage.getItem('jwtToken') ? {logged: true} : {logged: false}

const store = createStore(
	  reducer,
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