import React from "react";
import {Col, Container, Row} from "reactstrap";
import RelicCard from "./RelicCard";

class RelicDeck extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col><RelicCard/></Col>
                    <Col><RelicCard/></Col>
                    <Col><RelicCard/></Col>
                </Row>
            </Container>
        );
    }
}

export default RelicDeck;