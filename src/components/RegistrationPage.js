import React, {Component} from "react";
import {Card, CardBody, CardHeader, Col, Form, Button, Input} from 'reactstrap';
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
        	<Form className="small-flex">
    		<Col sm="12" md={{ size: 5}}>
            	<Card >
            		<CardHeader>Rejestracja</CardHeader>                	
        			<CardBody>
                    	<Input className="sm-outside-marigins" type="text" name="username" placeholder="Email" value={this.state.username}
                    			onChange={this.handleUsernameChange}/>
                    	<Input className="sm-outside-marigins" type="password" name="password" placeholder="Password" value={this.state.password}
                    			onChange={this.handlePasswordChange}/>
                    	<Button outline color="success" className="float-right" onClick={this.handleRegistration}>Zarejestruj</Button>
            		</CardBody>
            	</Card>
            </Col>
        </Form>
        );
    }

}


