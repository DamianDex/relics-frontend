import React, {Component} from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, CardSubtitle } from 'reactstrap'
import AdminRelicsFilterPanel from "./AdminRelicsFilterPanel";
import ResultsPanel from "../../components/database/ResultsPanel";
import {CONFIGURATION} from '../../configuration/configuration';
import axios from 'axios';

export default class AdminRelicsTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterSuffix: '/',
        }
        this.handleFilter = this.handleFilter.bind(this);
    }

    handleFilter(filterSuffix) {
        this.setState({filterSuffix: filterSuffix});
    }

    render() {
        return (
            <TabPane tabId="1">
            <Card>
                <Row>
                    <Col sm="12" md={{size: 4}}>
                        <Card>
                            <AdminRelicsFilterPanel filterHandler={this.handleFilter}/>
                        </Card>
                    </Col>
                    <Col sm="12" md={{size: 8}}>
                        <ResultsPanel filterSuffix={this.state.filterSuffix} />
                    </Col>
                </Row>
            </Card>
            </TabPane>
        );
    }
}
