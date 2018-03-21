import React, {Component} from "react";

import {Card, CardBody, CardHeader, CardText, CardTitle} from 'reactstrap';
import "./RelicMainPhoto.css"

export default class RelicMainPhoto extends Component {

    constructor(props) {
        super(props);

        this.state = {
            imageSrc: '/images/images.jpg'
        }
    }

    render() {
        return (
            <Card>
                <CardHeader>Teraz poznajesz</CardHeader>
                <CardBody>
                    <CardTitle>
                        <p class="main-photo-body">{this.props.identification}</p>
                    </CardTitle>
                    <CardText>
                        <p class="main-photo-body">Numer w rejestrze: {this.props.registerNumber}</p>
                    </CardText>
                    <img src={process.env.PUBLIC_URL + this.state.imageSrc}/>
                </CardBody>
            </Card>
        );
    }
}


