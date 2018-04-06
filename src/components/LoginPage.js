import React, {Component} from "react";
import "../App.css";
import {CONFIGURATION} from '../configuration/configuration'
import {Card, CardBody, CardHeader, CardFooter, Col, Label, Button, Input, NavLink, Form} from 'reactstrap';
import axios from 'axios';
import View from 'react-flexbox';


export default class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.test = this.test.bind(this);
        this.state = {username: '', password: ''};
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.endpoint = 'http://' + CONFIGURATION.HOST + ':' + CONFIGURATION.PORT
    }

    handleUsernameChange(e) {
        this.setState({username: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    async handleLogin(e) {
        try {
            var response = await axios.post(this.endpoint + '/login',
                JSON.stringify({username: this.state.username, password: this.state.password}),
                {withCredentials: true});
            var jwtToken = response.headers['authorization'];
            if (jwtToken != null){
                sessionStorage.setItem("jwtToken", response.headers['authorization']);
            }
            
        } catch (err) {
            console.log(err);
        }
        console.log("sessionstoragetoken: " + sessionStorage.getItem("jwtToken"));
    }

    async test(e) {
        try {
            var response = await axios.post(this.endpoint + '/api/my-profile', {},
            	{headers:{
            		'authorization': sessionStorage.getItem('jwtToken')
            	}},
                {withCredentials: true});
            console.log(response);
            
        } catch (err) {
            console.log(err);
        }
    }
	//<Button className="sm-bottom-marigin" type="button" onClick={this.test}>Profile test</Button><br/>

    render() {
        return (
        	<div className="small-flex">
        		<Col sm="12" md={{ size: 5}}>
                	<Card >
                		<CardHeader>Zaloguj się</CardHeader>                	
            			<CardBody>
                			<Input className="sm-outside-marigins" type="text" name="username" placeholder="Email" value={this.state.username}
                					onChange={this.handleUsernameChange}/>
                			<Input className="sm-outside-marigins" type="password" name="password" placeholder="Hasło" value={this.state.password}
                					onChange={this.handlePasswordChange}/>
                			<Button outline color="success" className="float-right" onClick={this.handleLogin}>Login</Button><br/><br/>
                            <CardFooter >
                				<Label>Nie posiadasz jeszcze konta?</Label>
                				<NavLink style={{display:'contents'}} href="/register"> Zarejestruj sie!</NavLink>
                			</CardFooter>
                		</CardBody>
                	</Card>
                </Col>
            </div>

        );
    }

}


