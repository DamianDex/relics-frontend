import React, {Component} from "react";
import {Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label} from "reactstrap";
import VoivodeshipFilterDropdown from "../ranking/filter/VoivodeshipFilterDropdown";
import CategoryFilterDropdown from "../ranking/filter/CategoryFilterDropdown";
import axios from 'axios';


export default class AdminRelicsFilterPanel extends Component {


    constructor(props) {
        super(props);

        this.state = {
            approved: false,
            category: "",
            voivodeship: "",
            disctrictName: "",
            communeName: "",
            placeName: "",
            changedIndex: -1,
            districtNames: [],
            communeNames: [],
            placeNames: []

        }

        this.handleSearch = this.handleSearch.bind(this);

        this.handleApprovedChange = this.handleApprovedChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleVoivodeshipChange = this.handleVoivodeshipChange.bind(this);
        this.handledDisctrictNameChange = this.handledDisctrictNameChange.bind(this);
        this.handleCommuneNameChange = this.handleCommuneNameChange.bind(this);
        this.handlePlaceNameChange = this.handlePlaceNameChange.bind(this);

        this.loadDistrictNames = this.loadDistrictNames.bind(this);
        this.loadCommuneNames = this.loadCommuneNames.bind(this);
        this.loadPlaceNames = this.loadPlaceNames.bind(this);

    }

    componentWillMount() {
        this.loadDistrictNames();
        this.loadCommuneNames();
        this.loadPlaceNames();
    }


    async loadDistrictNames() {
        await axios.get(this.endpoint + '/api/admin', {
         	headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': sessionStorage.getItem("jwtToken")
             }},
             {withCredentials: true})
        .then((response) => {
            this.setState({loadDistrictNames: response.data})
        }).catch((error) => {
            console.log(error);
        })
    }

    async loadCommuneNames() {
        await axios.get(this.endpoint + '/api/admin', {
          	headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': sessionStorage.getItem("jwtToken")
             }},
             {withCredentials: true})
        .then((response) => {
            this.setState({loadDistrictNames: response.data})
        }).catch((error) => {
            console.log(error);
        })
    }

    async loadPlaceNames() {
        await axios.get(this.endpoint + '/api/admin', {
        	headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': sessionStorage.getItem("jwtToken")
            }},
            {withCredentials: true})
        .then((response) => {
            this.setState({loadDistrictNames: response.data})
        }).catch((error) => {
            console.log(error);
        })
    }

    render() {
        return (
            <Card>
                <CardHeader align="center">Opcje wyszukiwania</CardHeader>
                <CardBody>
                    <Form style={{padding: "15px"}}>
                        <br/>
                        <FormGroup row>
                            <Label for="approved" sm={4}>Zatwierdzono</Label>
                            <Col sm={8}>
                                <Input value={this.state.approved} onChange={this.handleApprovedChange} type="checkbox"
                                       className="big-checkbox"
                                       name="approved"
                                       id="approved"/>
                            </Col>
                        </FormGroup>

                        <CategoryFilterDropdown labelName='Kategoria' value={this.state.category}
                                                onChangeValue={this.handleCategoryChange}/>

                        <VoivodeshipFilterDropdown value={this.state.voivodeship}
                                                   onChangeValue={this.handleVoivodeshipChange}/>

                        <FormGroup row>
                            <Label for="districtName" sm={4}>Powiat</Label>
                            <Col sm={8}>
                                <Input value={this.state.disctrictName} onChange={this.handledDisctrictNameChange} type="select"
                                       name="districtName"
                                       id="districtName"/>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="communeName" sm={4}>Gmina</Label>
                            <Col sm={8}>
                                <Input value={this.state.communeName} onChange={this.handleCommuneNameChange} type="select"
                                       name="communeName"
                                       id="communeName"/>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="placeName" sm={4}>Miejscowość</Label>
                            <Col sm={8}>
                                <Input value={this.state.placeName} onChange={this.handlePlaceNameChange} type="select"
                                       name="placeName"
                                       id="placeName"/>
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Button outline className="float-right" color="success" onClick={this.handleSearch}>Szukaj</Button>
                            <Button outline className="float-right" color="primary">Wyczyść</Button>
                            <br />
                        </FormGroup>

                    </Form>
                </CardBody>
            </Card>
        );
    }

    handleApprovedChange(e) {
        this.setState({approved: e.target.value})
    }

    handleCategoryChange(e) {
        this.setState({category: e.target.value})
    }

    handleVoivodeshipChange(e) {
        this.setState({voivodeship: e.target.value})
    }

    handledDisctrictNameChange(e) {
        this.setState({disctrictName: e.target.value})
    }

    handleCommuneNameChange(e) {
        this.setState({communeName: e.target.value})
    }

    handlePlaceNameChange(e) {
        this.setState({placeName: e.target.value})
    }

    handleSearch() {
        this.props.filterHandler(this.state.approved, this.state.category, this.state.voivodeship,
            this.state.disctrictName, this.state.communeName, this.state.placeName);
    }
}


