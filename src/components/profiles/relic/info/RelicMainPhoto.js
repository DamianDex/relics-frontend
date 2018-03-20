import React, {Component} from "react";

import {Card, CardBody, CardHeader, CardText, CardTitle} from 'reactstrap';

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
                        <CardTitle>Special Title Treatment</CardTitle>
                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                        <img src={process.env.PUBLIC_URL + this.state.imageSrc}/>
                    </CardBody>
                </Card>
        );
    }
}


