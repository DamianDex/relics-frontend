import React, {Component} from "react";
import RelicMainPhoto from "./RelicMainPhoto";
import RelicDetails from "./RelicDetails";
import RelicRating from "./RelicRating";
import {Col, Container, Row} from "reactstrap";

export default class RelicInfoComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <Row>
                    <Col>
                        <RelicMainPhoto/>
                    </Col>
                    <Col>
                        <RelicDetails/>
                        {this.props.id}
                    </Col>
                    <Col>
                        <RelicRating/>
                    </Col>
                </Row>
        );
    }
}


