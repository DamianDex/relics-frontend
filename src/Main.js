import React, {Component} from "react";
import "./App.css";

import { Row, Col } from 'reactstrap';
import RelicDeck from "./relics/RelicDeck";
import RelicNew from "./relics/RelicNew";

export default class Main extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col xs="3">
                        <RelicNew/>
                    </Col>
                    <Col xs="auto">
                        <RelicDeck/>
                        <RelicDeck/>
                    </Col>
                    <Col xs="3">.col-3</Col>
                </Row>
            </div>
        );
    }
}