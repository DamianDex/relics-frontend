import React, {Component} from "react";
import MapComponent from "../map/MapComponent";
import {Col, Row} from "reactstrap";

export default class RelicProfilePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row>
                <Col sm="12" md={{size: 10, offset: 1}}>
                    <p>Relics Profile Page will be here !!!: {this.props.match.params.relicId}</p>
                    <p>Map</p>
                    <MapComponent/>
                </Col>
            </Row>
        );
    }
}


