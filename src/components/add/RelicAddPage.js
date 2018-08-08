import React from 'react';
import {
    Alert,
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row
} from 'reactstrap';
import axios from "axios";
import CategoryFilterDropdown from "../ranking/filter/CategoryFilterDropdown";
import VoivodeshipFilterDropdown from "../ranking/filter/VoivodeshipFilterDropdown";
import CoordinatesPicker from "./CoordinatesPicker";

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
            category: '',
            images: '',
            visible: false,
            modal: false,

            isPickerOpen: false,
            coordinates: {
                latitude: '',
                longitude: '',
            }
        };
        this.baseState = this.state;

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
        this.handleCoordinatesChange = this.handleCoordinatesChange.bind(this);
        this.handlePickerClick = this.handlePickerClick.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.toggle = this.toggle.bind(this);
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

    handleCoordinatesChange(e) {
        this.setState({
            coordinates: {
                latitude: e.latLng.lat(),
                longitude: e.latLng.lng()
            }
        })
    }

    handlePickerClick(e) {
        this.setState({
            isPickerOpen: !this.state.isPickerOpen
        })
    }

    onDismiss() {
        this.setState({
            visible: false
        })
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleClick(e) {
        if (this.state.identification === '' || this.state.registerNumber === '' || this.state.category === '') {
            this.setState({modal: true})
        }
        else {
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

            var latitude = this.state.coordinates.latitude;
            var longitude = this.state.coordinates.longitude;

            this.setState(this.baseState);
            this.setState({visible: true});


            axios.post('http://localhost:8090/api/relics', {

                identification: identification,
                description: description,
                registerNumber: registerNumber,
                datingOfObject: datingOfObject,
                approved: false,
                geographicLocation: {
                    voivodeshipName: voivodeshipName,
                    districtName: districtName,
                    communeName: communeName,
                    placeName: placeName,
                    street: street,
                    latitude: latitude,
                    longitude: longitude
                },
                images: [{
                    pathToImage: images,
                    isMainImage: true
                }],
                categories: [{
                    categoryName: category
                }]

            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': sessionStorage.getItem("jwtToken")
                }
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    render() {
        return (
            <div>

                    <Col sm="12" md={{size: 6, offset: 3}}>
                        <br/>
                        <Card>
                            <CardHeader align="center">Dodawanie zabytku</CardHeader>
                            <CardBody>
                                <br/>
                                <Col sm={12}>
                                    <p> Aby dodać zabytek do bazy uzupełnij poniższe pola. Po weryfikacji podanych
                                        danych zabytek
                                        zostanie umieszczeony w bazie.</p><br/>
                                    <Form>
                                        <FormGroup row >
                                            <Label for="identification" sm={3}>Nazwa zabytku*</Label>
                                            <Col sm={9}>
                                                <Input  type="text" name="identification"
                                                       id="identification"
                                                       value={this.state.identification}
                                                       onChange={this.handleIdentificationChange}/>
                                            </Col>
                                        </FormGroup>
                                        <CategoryFilterDropdown labelName='Kategoria*' categoryLabelWidth={3}
                                                                categoryInputWidth={9} value={this.state.category}
                                                                onChangeValue={this.handleCategory}/>
                                        <FormGroup row>
                                            <Label for="registerNumber" sm={3}>Nr w rejestrze*</Label>
                                            <Col sm={9}>
                                                <Input type="text" name="registerNumber"
                                                       id="registerNumber"
                                                       value={this.state.registerNumber}
                                                       onChange={this.handleRegisterNumberChange}/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="datingOfObject" sm={3}>Data powstania</Label>
                                            <Col sm={9}>
                                                <Input type="text" name="datingOfObject"
                                                       id="datingOfObject"
                                                       value={this.state.datingOfObject}
                                                       onChange={this.handleDatingOfObject}/>
                                            </Col>
                                        </FormGroup>
                                        <VoivodeshipFilterDropdown value={this.state.voivodeshipName} voivodeshipLabelWidth={3}
                                                                   voivodeshipInputWidth={9}
                                                                   onChangeValue={this.handleVoivodeshipName}/>
                                        <FormGroup row>
                                            <Label for="districtName" sm={3}>Powiat</Label>
                                            <Col sm={9}>
                                                <Input type="text" name="districtName"
                                                       id="districtName"
                                                       value={this.state.districtName}
                                                       onChange={this.handleDistrictName}/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="communeName" sm={3}>Gmina</Label>
                                            <Col sm={9}>
                                                <Input type="text" name="communeName"
                                                       id="communeName"
                                                       value={this.state.communeName}
                                                       onChange={this.handleCommuneName}/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="placeName" sm={3}>Miejscowość</Label>
                                            <Col sm={9}>
                                                <Input type="text" name="placeName"
                                                       id="placeName"
                                                       value={this.state.placeName}
                                                       onChange={this.handlePlaceName}/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="street" sm={3}>Ulica</Label>
                                            <Col sm={9}>
                                                <Input type="text" name="street"
                                                       id="street"
                                                       value={this.state.street}
                                                       onChange={this.handleStreet}/>
                                            </Col>
                                        </FormGroup>

                                        <FormGroup row>
                                            <Label for="coordinates" sm={3}>Współrzędne</Label>
                                            <Col sm={9}>
                                                <InputGroup>
                                                    <Input type="text" name="latitude"
                                                           id="latitude"
                                                           value={this.state.coordinates.latitude}/>
                                                    <Input type="text" name="longitude"
                                                           id="longitude"
                                                           value={this.state.coordinates.longitude}/>
                                                    <InputGroupAddon addonType="append">
                                                        <Button color="secondary" onClick={this.handlePickerClick}>Wskaż
                                                            na mapie!</Button>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                            </Col>
                                        </FormGroup>

                                        <FormGroup row>
                                            <Label for="description" sm={3}>Opis</Label>
                                            <Col sm={9}>
                                                <Input type="textarea" name="description"
                                                       id="description"
                                                       value={this.state.description}
                                                       onChange={this.handleDescriptionChange}/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                                <Label for="profileImage" sm={3}>Zdjęcie profilowe</Label>
                                            <Col sm={9}>
                                                <Input type="file" name="profileImage"
                                                       id="profileImage"
                                                       value={this.state.images}
                                                       onChange={this.handleImages}/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup check row>
                                            <Col sm={{size: 3, offset: 8}}>
                                                <Button outline color="primary" onClick={this.handleClick}>Dodaj
                                                    Zabytek</Button>
                                            </Col>
                                        </FormGroup>
                                        <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
                                            Zabytek został dodany do bazy.
                                        </Alert>
                                    </Form>
                                    <p> * pola wymagane</p>
                                </Col>
                                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                                    <ModalHeader toggle={this.toggle}>Uzupełnij pola wymagane</ModalHeader>
                                    <ModalBody>
                                        Pola oznaczone *, są polami wymaganymi. Uzupełnij wymagane pola
                                        i spróbuj ponownie.
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onClick={this.toggle}>OK</Button>
                                    </ModalFooter>
                                </Modal>
                            </CardBody>
                        </Card>
                    </Col>
                

                <CoordinatesPicker coordinates={this.state.coordinates}
                                   onChangeValue={this.handleCoordinatesChange}
                                   isOpen={this.state.isPickerOpen}
                                   handlePickerClick={this.handlePickerClick}
                                   modalTitle="Wskaż zabytek na mapie"
                                   btnText="Zapisz współrzędne"
                                   mLongitude={21}
                                   mLatitude={52}/>
            </div>
        );
    }
}
