import React, {Component} from "react";
import {CONFIGURATION} from '../configuration/configuration'
import {Button, Form, Input, NavLink} from 'reactstrap';
import axios from 'axios';

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
    
    render() {
        return (
            <Form>
                <label>Nie masz konta? <NavLink href="/register"> Zarejestruj sie!</NavLink></label>
                <Input type="text" name="username" placeholder="Email" value={this.state.username}
                       onChange={this.handleUsernameChange}/>
                <Input type="password" name="password" placeholder="Password" value={this.state.password}
                       onChange={this.handlePasswordChange}/>
                <Button type="button" onClick={this.handleLogin}>Login</Button><br/>
                <Button type="button" onClick={this.test}>Profile test</Button><br/>
            </Form>
        );
    }

}


