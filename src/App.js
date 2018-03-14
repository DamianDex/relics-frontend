import React, {Component} from "react";
import { Switch, Route } from 'react-router';

import Header from "./Header";
import Main from "./components/MainPage";
import LoginPage from "./components/LoginPage";
import RelicsDBPage from "./components/RelicsDbPage";
import RelicsLocalizePage from "./components/RelicsLocalizePage";
import RelicsRankingPage from "./components/RelicsRankingPage";
import RelicsAddPage from "./components/RelicsAddPage";

export default class App extends Component {
    render() {
        return (
          <div>
  		    <Header />
		    <Switch>
		    	<Route exact path='/' component={Main}/>
	    		<Route exact path='/login' component={LoginPage}/>
				<Route exact path='/relics' component={RelicsDBPage}/>
				<Route exact path='/localize' component={RelicsLocalizePage}/>
				<Route exact path='/ranking' component={RelicsRankingPage}/>
				<Route exact path='/add' component={RelicsAddPage}/>
	    	</Switch>
  		  </div>
        );
    }
}
