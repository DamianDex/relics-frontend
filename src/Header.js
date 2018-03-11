import React from 'react';
import {BrowserRouter, Link, Switch, Route } from 'react-router-dom';

import CustomNavbar from './components/CustomNavbar'
//import { LoginLink, LogoutLink, Authenticated, NotAuthenticated } from 'react-stormpath';
 
export default class Header extends React.Component {
  render() {
    return (
    	<BrowserRouter>
    		<CustomNavbar />
    	</BrowserRouter>
    );
  }
}