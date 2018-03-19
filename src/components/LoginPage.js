import React, {Component} from "react";
import {Button, Form, Input, NavLink} from 'reactstrap';
import axios from 'axios';

export default class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = {username: '', password: ''};
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleUsernameChange(e) {
        this.setState({username: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    async handleLogin(e) {
        try {
            var response = await axios.post('http://localhost:8090/login',
                JSON.stringify({username: this.state.username, password: this.state.password}),
                {withCredentials: true});
            sessionStorage.setItem("jwtToken", response.headers['authorization']);
        } catch (err) {
            console.log(err);
        }
        console.log("sessionstoragetoken: " + sessionStorage.getItem("jwtToken"));
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
            </Form>
        );
    }

}


