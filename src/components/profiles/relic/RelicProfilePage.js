import React, {Component} from "react";
import {Col, Row} from "reactstrap";
import RelicInfoComponent from "./info/RelicInfoComponent";
import MapComponent from "../../../map/MapComponent";
import RelicGallery from "./gallery/RelicGallery";
import "./RelicProfilePage.css"

export default class RelicProfilePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div class="relic-profile-info">
                    <Row>
                        <Col sm="12" md={{size: 10, offset: 1}}>
                            <br/>
                            <RelicInfoComponent id={this.props.match.params.relicId}/>
                            <br/>
                        </Col>
                    </Row>
                </div>
                <div class="relic-gallery">
                    <Row>
                        <Col sm="12" md={{size: 10, offset: 1}}>
                            <br/>
                            <RelicGallery/>
                            <br/>
                        </Col>
                    </Row>
                </div>
                <div class="relic-map">
                    <Row>
                        <Col sm="12" md={{size: 10, offset: 1}}>
                            <br/>
                            <MapComponent id={this.props.match.params.relicId}/>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}