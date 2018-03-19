import React, {Component} from "react";
import {Button, Form, Input} from 'reactstrap';
import axios from 'axios';

export default class RegistrationPage extends Component {


    constructor(props) {
        super(props);
        this.handleRegistration = this.handleRegistration.bind(this);
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

    async handleRegistration(e) {
        try {
            let data = JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
            var response = await axios.post('http://localhost:8090/api/user/add', data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <Form>
                <Input type="text" name="username" placeholder="Email" value={this.state.username}
                       onChange={this.handleUsernameChange}/>
                <Input type="password" name="password" placeholder="Password" value={this.state.password}
                       onChange={this.handlePasswordChange}/>
                <Button type="button" onClick={this.handleRegistration}>Register</Button>
            </Form>
        );
    }

}


