import React, {Component} from "react";
import "./App.css";

import { Container, Row, Col } from 'reactstrap';
import RelicDeck from "./relics/RelicDeck";
import RelicNew from "./relics/RelicNew";


class App extends Component {
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

export default App;
