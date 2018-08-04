import React, {Component} from "react";
import {Col, Row, Card, CardBody, CardHeader, Form, FormGroup, Label, Input, Button} from "reactstrap";
import UserController from "../../../../controllers/UserController"
import axios from "axios";
import UserReviewsSearchPanel from "./UserReviewsSearchPanel";
import UserReviewsResultPanel from "./UserReviewsResultPanel";

export default class UserReviewsPage extends Component{

    constructor(props) {
        super(props);

        this.userController = new UserController();

        this.state = {
            vote: "",
            category: "",

        }

        this.filterHandler = this.filterHandler.bind(this);

    }

    filterHandler(vote, category) {
        this.setState({
            vote: vote,
            category: category
        })
    }

    render(){
        return(
            <Row>
                <Col sm="3" md={{size: 3, offset: 1}}>
                    <br/>
                    <UserReviewsSearchPanel searchPhrase={this.props.match.params.search} filterHandler={this.filterHandler}/>
                </Col>
                <Col sm="7" md={{size: 7, offset: -1}}>
                    <br/>
                    <UserReviewsResultPanel vote={this.state.vote} category={this.state.category}/>
                </Col>
            </Row>
        )
    }

}