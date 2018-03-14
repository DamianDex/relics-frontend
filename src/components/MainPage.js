import React, {Component} from "react";
import "../App.css";
import RelicDeck from "../relics/RelicThreeSmallCardsDeck";
import {Col, Container, Row} from "reactstrap";

export default class MainPage extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <br/>
                        <RelicDeck/>
                    </Col>
                </Row>
            </Container>
        );
    }
}