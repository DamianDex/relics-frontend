import React, {Component} from "react";

import {Card, CardBody, CardHeader} from 'reactstrap';
import "./RelicMainPhoto.css"

export default class RelicMainPhoto extends Component {

    constructor(props) {
        super(props);

        this.state = {
            imageSrc: '/images/icon.jpg'
        }
    }

    render() {
        return (
            <Card>
                <CardHeader>Teraz poznajesz</CardHeader>
                <CardBody>
                    <img class="main-photo" src={process.env.PUBLIC_URL + this.state.imageSrc}/>
                </CardBody>
            </Card>
        );
    }
}


