import React, {Component} from "react";
import {Card, CardBody, CardHeader, CardText} from "reactstrap";

export default class ReviewComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Card>
                    <CardHeader>Nazwa użytkownika</CardHeader>
                    <CardBody>
                        <CardText>Ocena</CardText>
                        <CardText>Treść recenzji + ocena.</CardText>
                    </CardBody>
                </Card>
                <br/>
                <Card>
                    <CardHeader>{this.props.username}</CardHeader>
                    <CardBody>
                        <CardText>{this.props.rating}</CardText>
                        <CardText>{this.props.review}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

}