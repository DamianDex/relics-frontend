import React, {Component } from "react";
import "../App.css";
import {CONFIGURATION} from '../configuration/configuration'
import {Card, CardBody, CardHeader, CardFooter, Col, Label, Button, Input, NavLink, Alert} from 'reactstrap';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { history } from '../index'


class LoginPage extends Component {
	
	static propTypes = {
		onLogin: PropTypes.func
    };
	
    constructor(props) {
        super(props);
        var logout = window.location.search === '?logout' ? true: null;
        var tokenExpired = window.location.search === '?expired' ? true: null;
        this.handleLogin = this.handleLogin.bind(this);
        this.state = {username: '', password: '', errorMessage: null, logout: logout, tokenExpired: tokenExpired};
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.endpoint = 'http://' + CONFIGURATION.HOST + ':' + CONFIGURATION.PORT;
    }

    handleUsernameChange(e) {
        this.setState({username: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }
    
    changeErrorMessage(errorMsg){
    	this.setState({errorMessage: errorMsg});
    }

    async handleLogin(e) {
    	const { onLogin } = this.props;      
        try {
            var response = await axios.post(this.endpoint + '/login',
                JSON.stringify({username: this.state.username, password: this.state.password}),
                {withCredentials: true});
            var jwtToken = response.headers['authorization'];
            if (jwtToken != null){
                sessionStorage.setItem("jwtToken", response.headers['authorization']);
                sessionStorage.setItem("role", response.data);
                onLogin(true);
                history.goBack();
            }   
        } catch (error) {
        	console.log(error);
            this.changeErrorMessage(error.response.data['message']);
        }
    }

//    async test(e) {
//        try {
//            var response = await axios.post(this.endpoint + '/api/my-profile', {},
//            	{headers:{
//            		'authorization': sessionStorage.getItem('jwtToken')
//            	}},
//                {withCredentials: true});            
//        } catch (error) {
//            this.changeErrorMessage(error.response.data['message']);
//
//        }
//    }
	//<Button className="sm-bottom-marigin" type="button" onClick={this.test}>Profile test</Button><br/>

    render() {
    	let alert = null; 
    	if (this.state.logout != null){
    		alert = <Alert color="success" visibility={this.state.logout}>Zostałeś pomyślnie wylogowany.</Alert>
    	} else if (this.state.tokenExpired != null){
    		alert = <Alert color="danger" visibility={this.state.logout}>Sesja wygasła, zaloguj się ponownie.</Alert>
    	}
    	
        return (
        	<div className="small-flex">
        		<Col sm="12" md={{ size: 5}}>
					{alert}
                	<Card >
                		<CardHeader>Zaloguj się</CardHeader>                	
            			<CardBody>
                			<Input className="sm-outside-marigins" type="text" name="username" placeholder="Login" value={this.state.username}
                					onChange={this.handleUsernameChange}/>
                			<Input className="sm-outside-marigins" type="password" name="password" placeholder="Hasło" value={this.state.password}
                					onChange={this.handlePasswordChange}/>
                			<Label className="error-label">{ this.state.errorMessage}</Label>
                			<Button outline color="success" className="float-right" onClick={this.handleLogin}>Login</Button><br/><br/>
                		</CardBody>
                		<CardFooter >
                            <Label>Nie posiadasz jeszcze konta?</Label>
                                <NavLink style={{display:'contents'}} href="/register"> Zarejestruj sie!</NavLink>
                        </CardFooter>
                	</Card>
                </Col>
            </div>

        );
    }

}

const mapStateToProps = (state) => {
	  return { logged: state.logged };
};

const mapDispatchToProps = (dispatch) => {
	  return {
	    onLogin: (data) => dispatch({ type: 'LOGIN', logged: data }),
	  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);



