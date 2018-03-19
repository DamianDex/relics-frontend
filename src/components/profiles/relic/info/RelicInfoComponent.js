import React, {Component} from "react";
import RelicMainPhoto from "./RelicMainPhoto";
import RelicDetails from "./RelicDetails";
import RelicRating from "./RelicRating";
import {Col, Row} from "reactstrap";

export default class RelicInfoComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <Row>
                    <Col>
                        <RelicMainPhoto id={this.props.id}/>
                    </Col>
                    <Col>
                        <RelicDetails id={this.props.id}/>
                    </Col>
                    <Col>
                        <RelicRating id={this.props.id}/>
                    </Col>
                </Row>
        );
    }
}


