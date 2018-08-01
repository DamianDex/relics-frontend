import React, {Component} from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, CardSubtitle } from 'reactstrap'
import AdminRelicsFilterPanel from "./AdminRelicsFilterPanel";
import AdminRelicsResultPanel from "./AdminRelicsResultPanel";
import axios from 'axios';

export default class AdminRelicsTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            approved: false,
            category: "",
            voivodeship: "",
            disctrictName: "",
            communeName: "",
            placeName: "",
        }
        this.handleFilter = this.handleFilter.bind(this);
    }

    handleFilter(approved, category, voivodeship, disctrictName, communeName, placeName) {
        this.setState({
            approved: approved,
            category: category,
            voivodeship: voivodeship,
            disctrictName: disctrictName,
            communeName: communeName,
            placeName: placeName,
        })
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
                        <AdminRelicsResultPanel />
                    </Col>
                </Row>
            </Card>
            </TabPane>
        );
    }
}
