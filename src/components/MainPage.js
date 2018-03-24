import React, {Component} from "react";
import "../App.css";
import RelicThreeSmallCardsDeck from "../relics/RelicThreeSmallCardsDeck";
import {Card, CardBody, CardHeader, Col, Row} from "reactstrap";

export default class MainPage extends Component {
    render() {
        return (
            <div>
                <br/>
                <Col sm="12" md={{size: 10, offset: 1}}>
                    <Card>
                        <CardHeader>Wybrane losowo</CardHeader>
                        <CardBody>
                            <Row>
                                <Col>
                                    <RelicThreeSmallCardsDeck/>
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
                                    <RelicThreeSmallCardsDeck/>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </div>
        );
    }
}