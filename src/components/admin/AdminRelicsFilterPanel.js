import React, {Component} from "react";
import {Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label} from "reactstrap";
import VoivodeshipFilterDropdown from "../ranking/filter/VoivodeshipFilterDropdown";
import CategoryFilterDropdown from "../ranking/filter/CategoryFilterDropdown";
import {CONFIGURATION} from '../../configuration/configuration'
import axios from 'axios';


export default class AdminRelicsFilterPanel extends Component {


    constructor(props) {
        super(props);

        this.state = {
            approved: false,
            category: "",
            voivodeship: "",
            districtName: "",
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
        this.handledDistrictNameChange = this.handledDistrictNameChange.bind(this);
        this.handleCommuneNameChange = this.handleCommuneNameChange.bind(this);
        this.handlePlaceNameChange = this.handlePlaceNameChange.bind(this);

        this.loadDistrictNames = this.loadDistrictNames.bind(this);
        this.loadCommuneNames = this.loadCommuneNames.bind(this);
        this.loadPlaceNames = this.loadPlaceNames.bind(this);

        this.endpoint = 'http://' + CONFIGURATION.HOST + ':' + CONFIGURATION.PORT;
    }

    async componentWillMount() {
        this.loadDistrictNames();
        this.loadCommuneNames();
        this.loadPlaceNames();
    }

    async loadDistrictNames(voivodeship) {
        var filterChain = "";
        if (typeof voivodeship !== 'undefined' && voivodeship !== '') filterChain += "?voivodeship=" + voivodeship;
        await axios.get(this.endpoint + '/api/admin/districts' + filterChain, {
         	headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': sessionStorage.getItem("jwtToken")
             }},
             {withCredentials: true})
        .then((response) => {
            this.setState({districtNames: response.data})
        }).catch((error) => {
            console.log(error);
        })
    }

    async loadCommuneNames(voivodeship, districtName) {
        var filterChain = "";
        if (typeof voivodeship !== 'undefined' && voivodeship !== '') filterChain += "?voivodeship=" + voivodeship;
        if (typeof districtName !== 'undefined' && districtName !== '') filterChain += "&districtName=" + districtName;
        await axios.get(this.endpoint + '/api/admin/communes' + filterChain, {
          	headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': sessionStorage.getItem("jwtToken")
             }},
             {withCredentials: true})
        .then((response) => {
            this.setState({communeNames: response.data})
        }).catch((error) => {
            console.log(error);
        })
    }

    async loadPlaceNames(voivodeship, districtName, communeName) {
        var filterChain = "";
        if (typeof voivodeship !== 'undefined' && voivodeship !== '') filterChain += "?voivodeship=" + voivodeship;
        if (typeof districtName !== 'undefined' && districtName !== '') filterChain += "&districtName=" + districtName;
        if (typeof communeName !== 'undefined' && communeName !== '') filterChain += "&communeName=" + communeName;
        await axios.get(this.endpoint + '/api/admin/places' + filterChain, {
        	headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': sessionStorage.getItem("jwtToken")
            }},
            {withCredentials: true})
        .then((response) => {
            this.setState({placeNames: response.data})
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
                                                categoryLabelWidth={4}
                                                categoryInputWidth={8}
                                                onChangeValue={this.handleCategoryChange}/>

                        <VoivodeshipFilterDropdown value={this.state.voivodeship}
                                                   voivodeshipLabelWidth={4}
                                                   voivodeshipInputWidth={8}
                                                   onChangeValue={this.handleVoivodeshipChange}/>

                        <FormGroup row>
                            <Label for="districtName" sm={4}>Powiat</Label>
                            <Col sm={8}>
                                <Input value={this.state.districtName} onChange={this.handledDistrictNameChange} type="select"
                                       name="districtName"
                                       id="districtName">
                                    <option></option>
                                    {
                                        this.state.districtNames.map(item => {
                                            return (
                                                <option>{item}</option>
                                                );
                                        })
                                    }
                                </Input>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="communeName" sm={4}>Gmina</Label>
                            <Col sm={8}>
                                <Input value={this.state.communeName} onChange={this.handleCommuneNameChange} type="select"
                                       name="communeName"
                                       id="communeName">
                                    <option></option>
                                    {
                                        this.state.communeNames.map(item => {
                                            return (
                                                <option>{item}</option>
                                                );
                                        })
                                    }
                                </Input>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="placeName" sm={4}>Miejscowość</Label>
                            <Col sm={8}>
                                <Input value={this.state.placeName} onChange={this.handlePlaceNameChange} type="select"
                                       name="placeName"
                                       id="placeName">
                                    <option></option>
                                    {
                                        this.state.placeNames.map(item => {
                                            return (
                                                <option>{item}</option>
                                                );
                                        })
                                    }
                                </Input>
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

    async handleVoivodeshipChange(e) {
        var voivodeship = e.target.value;
        this.setState({voivodeship: voivodeship})
        this.loadDistrictNames(voivodeship);
        this.loadCommuneNames(voivodeship);
        this.loadPlaceNames(voivodeship);
    }

    async handledDistrictNameChange(e) {
        var districtName = e.target.value;
        this.setState({districtName: districtName})
        this.loadCommuneNames(this.state.voivodeship, districtName);
        this.loadPlaceNames(this.state.voivodeship, districtName);
    }

    async handleCommuneNameChange(e) {
        var communeName = e.target.value;
        this.setState({communeName: communeName})
        if (typeof this.state.districtName === 'undefined' || this.state.districtName === '' ) this.loadDistrictNames();
        this.loadPlaceNames(this.state.voivodeship, this.state.districtName, communeName);
    }

    async handlePlaceNameChange(e) {
        this.setState({placeName: e.target.value})
        if (typeof this.state.districtName === 'undefined' || this.state.districtName === '' ) this.loadDistrictNames();
        if (typeof this.state.communeName === 'undefined' || this.state.communeName === '' )  this.loadCommuneNames();
    }

    handleSearch() {
        this.props.filterHandler(this.state.approved, this.state.category, this.state.voivodeship,
            this.state.districtName, this.state.communeName, this.state.placeName);
    }
}


