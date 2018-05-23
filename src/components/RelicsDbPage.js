import React, {Component} from "react";
import SearchPanel from "./database/SearchPanel";
import {Col, Row} from "reactstrap";
import ResultsPanel from "./database/ResultsPanel";

export default class RelicsDbPage extends Component {
    render() {
        return (
            <Row>
                <Col sm="12" md={{size: 3, offset: 1}}>
                    <br/>
                    <SearchPanel searchPhrase={this.props.match.params.search}/>
                </Col>
                <Col sm="12" md={{size: 7, offset: -1}}>
                    <br/>
                    <ResultsPanel/>
                </Col>
            </Row>
        );
    }
}


