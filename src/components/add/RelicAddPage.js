import React from 'react';
import {Button, Form, FormGroup, Label, Input, FormText,Col,Card, CardBody, CardHeader,Row } from 'reactstrap';
import axios from "axios";
import CategoryFilterDropdown from "../ranking/filter/CategoryFilterDropdown";
import VoivodeshipFilterDropdown from "../ranking/filter/VoivodeshipFilterDropdown";
import CategoryMultipleDropdown from "./Dropdown/CategoryMultipleDropdown";

export default class RelicAddPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            identification: '',
            description: '',
            registerNumber: '',
            datingOfObject: '',
            geographicLocation: '',
            voivodeshipName: '',
            districtName: '',
            communeName: '',
            category:'',
            images:''
        };

        this.handleIdentificationChange = this.handleIdentificationChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleRegisterNumberChange = this.handleRegisterNumberChange.bind(this);
        this.handleDatingOfObject = this.handleDatingOfObject.bind(this);
        this.handleVoivodeshipName = this.handleVoivodeshipName.bind(this);
        this.handleDistrictName = this.handleDistrictName.bind(this);
        this.handleCommuneName = this.handleCommuneName.bind(this);
        this.handlePlaceName = this.handlePlaceName.bind(this);
        this.handleStreet = this.handleStreet.bind(this);
        this.handleImages = this.handleImages.bind(this);
        this.handleCategory = this.handleCategory.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleIdentificationChange(e) {
        this.setState({identification: e.target.value})
    }

    handleDescriptionChange(e) {
        this.setState({description: e.target.value})
    }

    handleRegisterNumberChange(e) {
        this.setState({registerNumber: e.target.value})
    }

    handleDatingOfObject(e) {
        this.setState({datingOfObject: e.target.value})
    }

    handleVoivodeshipName(e) {
        this.setState({voivodeshipName: e.target.value})
    }

    handleDistrictName(e) {
        this.setState({districtName: e.target.value})
    }

    handleCommuneName(e) {
        this.setState({communeName: e.target.value})
    }

    handlePlaceName(e) {
        this.setState({placeName: e.target.value})
    }

    handleStreet(e) {
        this.setState({street: e.target.value})
    }

    handleImages(e) {
        this.setState({images: e.target.value})
    }

    handleCategory(e) {
        this.setState({category: e.target.value})
    }

    handleClick(e){
        if(this.state.identification === '' || this.state.registerNumber === '' || this.state.category === ''){
                alert('Uzupełnij wymagane pola');
                }
        else{
            var identification = this.state.identification;
            var description = this.state.description;
            var registerNumber = this.state.registerNumber;
            var datingOfObject = this.state.datingOfObject;
            var voivodeshipName = this.state.voivodeshipName;
            var districtName = this.state.districtName;
            var communeName = this.state.communeName;
            var placeName = this.state.placeName;
            var street = this.state.street;

            var images = this.state.images;
            var category = this.state.category;

                axios.post('http://localhost:8090/api/relics', {

                    identification: identification,
                    description: description,
                    registerNumber: registerNumber,
                    datingOfObject: datingOfObject,
                    geographicLocation:{
                        voivodeshipName: voivodeshipName,
                        districtName: districtName,
                        communeName: communeName,
                        placeName: placeName,
                        street: street,
                        latitude: 0,
                        longitude: 0
                    },
                    images:[{
                        pathToImage: images,
                        isMainImage: true}],
                    categories: [{
                        categoryName: category}]

                }, {
                    headers: {'Accept': 'application/json',
                              'Content-Type': 'application/json',
                              'authorization': sessionStorage.getItem("jwtToken")}
                })
                    .then(function (response) {
                        console.log(response);
                        alert('Zabytek został dodany do bazy');
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
        }
    }

  render() {
    return (
    <div>
      <Row>
        <Col sm="12" md={{size: 10, offset: 1}}>
            <br/>
            <Card>
                <CardHeader align="center">Dodawanie zabytku</CardHeader>
                <CardBody>
                      <br/>
                      <Col sm={12}>
                          <p> Aby dodać zabytek do bazy uzupełnij poniższe pola. Po weryfikacji podanych danych zabytek
                          zostanie umieszczeony w bazie.</p><br/>
                          <Form>
                            <FormGroup row>
                              <Label for="identification" sm={2}>Nazwa zabytku *</Label>
                              <Col sm={10}>
                                <Input type="text" name="identification"
                                        id="identification"
                                        value={this.state.identification}
                                        onChange={this.handleIdentificationChange}/>
                              </Col>
                            </FormGroup>
                            <CategoryFilterDropdown value={this.state.category}
                                                    onChangeValue={this.handleCategory}/>
                            <FormGroup row>
                              <Label for="registerNumber" sm={2}>Numer w rejestrze *</Label>
                              <Col sm={10}>
                                <Input type="text" name="registerNumber"
                                        id="registerNumber"
                                        value={this.state.registerNumber}
                                        onChange={this.handleRegisterNumberChange}/>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="datingOfObject" sm={2}>Data powstania</Label>
                              <Col sm={10}>
                                <Input type="text" name="datingOfObject"
                                        id="datingOfObject"
                                        value={this.state.datingOfObject}
                                        onChange={this.handleDatingOfObject}/>
                              </Col>
                            </FormGroup>
                            <VoivodeshipFilterDropdown  value={this.state.voivodeshipName}
                                                        onChangeValue={this.handleVoivodeshipName}/>
                            <FormGroup row>
                              <Label for="districtName" sm={2}>Powiat</Label>
                              <Col sm={10}>
                                <Input type="text" name="districtName"
                                        id="districtName"
                                        value={this.state.districtName}
                                        onChange={this.handleDistrictName}/>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="communeName" sm={2}>Gmina</Label>
                              <Col sm={10}>
                                <Input type="text" name="communeName"
                                        id="communeName"
                                        value={this.state.communeName}
                                        onChange={this.handleCommuneName}/>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="placeName" sm={2}>Miejscowość</Label>
                              <Col sm={10}>
                                <Input type="text" name="placeName"
                                        id="placeName"
                                        value={this.state.placeName}
                                        onChange={this.handlePlaceName}/>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="street" sm={2}>Ulica</Label>
                              <Col sm={10}>
                                <Input type="text" name="street"
                                        id="street"
                                        value={this.state.street}
                                        onChange={this.handleStreet}/>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="description" sm={2}>Opis</Label>
                              <Col sm={10}>
                                <Input type="textarea" name="description"
                                        id="description"
                                         value = {this.state.description}
                                         onChange={this.handleDescriptionChange}/>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="profileImage" sm={2}>Zdjęcie profilowe</Label>
                              <Col sm={10}>
                                <Input type="file" name="profileImage"
                                        id="profileImage"
                                        value = {this.state.images}
                                        onChange = {this.handleImages}/>
                              </Col>
                            </FormGroup>
                            <FormGroup check row>
                              <Col sm={{ size: 2, offset: 10 }}>
                                <Button outline color = "primary" onClick={this.handleClick}>Dodaj Zabytek</Button>
                              </Col>
                            </FormGroup>
                          </Form>
                          <p> * pola wymagane</p>
                      </Col>
                </CardBody>
            </Card>
            <br/>
        </Col>
       </Row>
    </div>
    );
  }
}
