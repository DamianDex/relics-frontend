import React, {Component} from "react";
import "../App.css";
import RelicDeck from "../relics/RelicDeck";
import {Col, Container, Row} from "reactstrap";

export default class MainPage extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <RelicDeck/>
                        <br/>
                        <RelicDeck/>
                    </Col>
                </Row>
            </Container>
        );
    }
}