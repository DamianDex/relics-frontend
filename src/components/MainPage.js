import React, {Component} from "react";
import "../App.css";
import RelicThreeSmallCardsDeck from "../relics/RelicThreeSmallCardsDeck";
import {Col, Row} from "reactstrap";

export default class MainPage extends Component {
    render() {
        return (
            <Row>
                <Col sm="12" md={{size: 10, offset: 1}}><RelicThreeSmallCardsDeck/></Col>
            </Row>
        );
    }
}