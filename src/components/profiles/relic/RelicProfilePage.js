import React, {Component} from "react";
import {Col, Row} from "reactstrap";
import RelicInfoComponent from "./info/RelicInfoComponent";

export default class RelicProfilePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row>
                <Col sm="12" md={{size: 10, offset: 1}}>
                    <br/>
                    <RelicInfoComponent id={this.props.match.params.relicId}/>
                </Col>
            </Row>
        );
    }
}


