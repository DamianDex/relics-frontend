import React, {Component} from "react";
import { Switch, Route } from 'react-router';

import Header from "./Header";
import Main from "./Main";
import LoginPage from "./components/LoginPage";

export default class App extends Component {
    render() {
        return (
          <div>
  		    <Header />
		    <Switch>
		    	<Route exact path='/' component={Main}/>
	    		<Route exact path='/login' component={LoginPage}/>
	    	</Switch>
  		  </div>
        );
    }
}
