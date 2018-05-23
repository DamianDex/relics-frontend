import React, {Component} from "react";
import {Card, CardBody, CardHeader} from "reactstrap";

export default class ResultsPanel extends Component {


    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Card>
                <CardHeader align="center">Wyniki wyszukiwania</CardHeader>
                <CardBody>
                    <p>Results will go here!</p>
                </CardBody>
            </Card>
        );
    }
}


