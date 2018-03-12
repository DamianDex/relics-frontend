import React from 'react';
import CustomNavbar from './components/CustomNavbar'

import { Switch, Route } from 'react-router-dom'
import LoginPage from "./components/LoginPage";
import App from "./App";

 
export default class Header extends React.Component {
  render() {
    return (
    	<div>
    		<CustomNavbar />
    	</div>
    );
  }
}


