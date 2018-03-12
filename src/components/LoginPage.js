import React, {Component} from "react";
import { Form, Input, Label, Button } from 'reactstrap';

export default class LoginPage extends Component {
    render() {
        return (
        	<Form>
        		<Label for="username">Username: </Label><Input id="username" name="username"/><br/>
        	    <Label for="password">Password:</Label><Input id="password" name="password"/><br/>
        	    <Button type="submit">Login!</Button>
        	</Form>
        );
    }
}


