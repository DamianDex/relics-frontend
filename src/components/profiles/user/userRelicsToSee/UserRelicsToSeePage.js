import React, {Component} from "react";
import {Col, Row, Card, CardBody, CardHeader, Form, FormGroup, Label, Input, Button} from "reactstrap";
import UserController from "../../../../controllers/UserController"
import axios from "axios";
import UserRelicsToSeeSearchPanel from "./UserRelicsToSeeSearchPanel";
import UserRelicsToSeeResultPanel from "./UserRelicsToSeeResultPanel";

export default class UserReviewsPage extends Component{

    constructor(props) {
        super(props);

        this.userController = new UserController();

        this.state = {
            category: "",
            place: ""
        }

        this.filterHandler = this.filterHandler.bind(this);

    }

    filterHandler(category, place) {
        this.setState({
            category: category,
            place: place
        })
    }

    render(){
        return(
            <Row>
                <Col sm="3" md={{size: 3, offset: 1}}>
                    <br/>
                    <UserRelicsToSeeSearchPanel searchPhrase={this.props.match.params.search} filterHandler={this.filterHandler}/>
                </Col>
                <Col sm="7" md={{size: 7, offset: -1}}>
                    <br/>
                    <UserRelicsToSeeResultPanel category={this.state.category} place={this.state.place}/>
                </Col>
            </Row>
        )
    }

}