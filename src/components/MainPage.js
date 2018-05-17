import React, {Component} from "react";
import "../App.css";
import RelicThreeSmallCardsDeck from "../relics/RelicThreeSmallCardsDeck";
import {Card, CardBody, CardHeader, Col, Form, Input, Row} from "reactstrap";

export default class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maximum: 10,
        };

        this.handleChangeDistance = this.handleChangeDistance.bind(this);
    }

    componentDidMount() {
        navigator.geolocation.watchPosition((position) => {

            this.setState(
                {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                }
            )
        });
    }

    handleChangeDistance(e) {
        this.setState({
            maximum: e.target.value
        })
    }

    render() {
        return (
            <div>
                <br/>
                <Col sm="12" md={{size: 10, offset: 1}}>
                    <Card>
                        <CardHeader>
                                <p>Blisko Ciebie</p>
                            <p>Twoja lokalizacja to: {this.state.latitude} {this.state.longitude}</p>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col>
                                    <RelicThreeSmallCardsDeck latitude='49.9888913'
                                                              longitude='19.904049699999998'
                                                              maximum={this.state.maximum}/>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <br/>
                <Col sm="12" md={{size: 10, offset: 1}}>
                    <Card>
                        <CardHeader>Rekomendowane dla Ciebie</CardHeader>
                        <CardBody>
                            <Row>
                                <Col>

                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </div>
        );
    }
}