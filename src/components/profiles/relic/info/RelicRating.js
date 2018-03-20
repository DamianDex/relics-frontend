import React, {Component} from "react";
import {Card, CardBody, CardHeader, CardText, CardTitle} from "reactstrap";
import "../RelicProfilePage.css"

export default class RelicRating extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <Card>
                    <CardHeader>Wasze oceny</CardHeader>
                    <CardBody>
                        <CardTitle>Special Title Treatment</CardTitle>
                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                    </CardBody>
                </Card>
        );
    }
}


