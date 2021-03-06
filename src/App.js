import React, {Component} from "react";
import {Route, Switch} from "react-router";
import "./App.css";

import Header from "./Header";
import MainPage from "./components/MainPage";
import LoginPage from "./components/LoginPage";
import RelicsDBPage from "./components/RelicsDbPage";
import RelicsLocalizePage from "./components/RelicsLocalizePage";
import RelicsRankingPage from "./components/ranking/RelicsRankingPage";
import RelicAddPage from "./components/add/RelicAddPage";
import RelicProfilePage from "./components/profiles/relic/RelicProfilePage";
import RegistrationPage from "./components/RegistrationPage";
import AdminMainPage from "./components/AdminMainPage";
import UserProfilePage from "./components/profiles/user/UserProfilePage";
import UserReviewsPage from "./components/profiles/user/userReviews/UserReviewsPage";
import UserRelicsToSeePage from "./components/profiles/user/userRelicsToSee/UserRelicsToSeePage";

export default class App extends Component {
    render() {
        return (
            <div>
    			<Header/>
                <Switch>
                    <Route exact path='/' component={MainPage}/>
                    <Route exact path='/login' component={LoginPage}/>
                    <Route exact path='/relics/:search' component={RelicsDBPage}/>
                    <Route exact path='/relics' component={RelicsDBPage}/>
                    <Route exact path='/localize' component={RelicsLocalizePage}/>
                    <Route exact path='/ranking' component={RelicsRankingPage}/>
                    <Route exact path='/add' component={RelicAddPage}/>
                    <Route exact path='/relic/:relicId' component={RelicProfilePage}/>
                    <Route exact path='/register' component={RegistrationPage}/>
                    <Route exact path='/admin' component={AdminMainPage}/>
                    <Route exact path='/my-profile' component={UserProfilePage}/>
                    <Route exact path='/my-reviews' component={UserReviewsPage}/>
                    <Route exact path='/my-relicsToSee' component={UserRelicsToSeePage}/>
                </Switch>
            </div>
        );
    }
}