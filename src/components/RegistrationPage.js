import React, {Component} from "react";
import {Card, CardBody, CardHeader, Col, Form, Button, Input, Label} from 'reactstrap';
import axios from 'axios';

export default class RegistrationPage extends Component {
	
	
    constructor(props) {
        super(props);
        this.handleRegistration = this.handleRegistration.bind(this);
        this.state = {username: '', password: '', errorMessage: null};
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.changeErrorMessage = this.changeErrorMessage.bind(this);
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
            if (response.data['result'] === "ERROR"){
                this.changeErrorMessage(response.data['description']);
            } else {
            	window.location = "/login";
            }
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
                    	<Input className="sm-outside-marigins" type="password" name="password" placeholder="Hasło" value={this.state.password}
                    			onChange={this.handlePasswordChange}/>
                    	<Label className="error-label">{this.state.errorMessage}</Label>
                    	<Button outline color="success" className="float-right" onClick={this.handleRegistration}>Zarejestruj</Button>     			
            		</CardBody>
            	</Card>
            </Col>
        </Form>
        );
    }

}


