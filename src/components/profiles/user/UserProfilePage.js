import React, {Component} from "react";
import {Col, Row, Card, CardBody, CardHeader, Form, FormGroup, Label, Input, Button} from "reactstrap";
import './UserProfilePage.css'
import UserController from "../../../controllers/UserController"
import axios from "axios";

export default class UserProfilePage extends Component{

    constructor(props) {
        super(props);

        this.userController = new UserController();

        this.state = {
            imageSrc: '/images/profileImage.png',
            accessInputField: true,
        }

        this.handleNickNameChange = this.handleNickNameChange.bind(this);
        this.handleEditButton = this.handleEditButton.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleProfileImageChange = this.handleProfileImageChange.bind(this);
        this.handleChangeButton = this.handleChangeButton.bind(this);
    }

    componentDidMount(){
        this.getUserDetails();
    }

    handleNickNameChange(e){
        this.setState({nickName: e.target.value})
    }

    handleFirstNameChange(e){
        this.setState({firstName: e.target.value})
    }

    handleLastNameChange(e){
        this.setState({lastName: e.target.value})
    }

    handleEmailChange(e){
        this.setState({email: e.target.value})
    }

    handleProfileImageChange(e){
        this.setState({imageSrc: e.target.value})
    }

    handleEditButton(){
        this.setState({accessInputField:!this.state.accessInputField})
    }

    handleChangeButton(e) {
            axios.put('http://localhost:8090/api/my-profile', {
                username: this.state.nickName,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                profileImage: this.state.imageSrc
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


    render(){
        return(
               <div>
                  <br/>
                  <Col sm="12" md={{size:10,offset:1}}>
                    <Card>
                        <CardHeader align="center">O mnie</CardHeader>
                        <CardBody>
                          <div className="user-component">
                            <Row>
                                <Col sm="2" md={{size:4}}>
                                    <img class="main-photo" src={process.env.PUBLIC_URL + this.state.imageSrc}/>

                                </Col>
                                <Col sm="9" md={{size:7,offset:-1}}>
                                    <br/>
                                    <Form>
                                        <FormGroup row>
                                            <Label for="nickName" sm={2}>Nick</Label>
                                            <Col sm={10}>
                                                <Input  type="text" name="nickName"
                                                        id="nickName" disabled={this.state.accessInputField}
                                                        value={this.state.nickName}
                                                        onChange={this.handleNickNameChange}
                                                        placeholder={this.state.nickName}
                                                        />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="firstName" sm={2}>Imię</Label>
                                            <Col sm={10}>
                                                <Input  type="text" name="firstName"
                                                        id="firstName" disabled={this.state.accessInputField}
                                                        value={this.state.firstName}
                                                        onChange={this.handleFirstNameChange}
                                                        placeholder={this.state.firstName}
                                                        />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="lastName" sm={2}>Nazwisko</Label>
                                            <Col sm={10}>
                                                <Input  type="text" name="lastName"
                                                        id="lastName" disabled={this.state.accessInputField}
                                                        value={this.state.lastName}
                                                        onChange={this.handleLastNameChange}
                                                        placeholder={this.state.lastName}
                                                        />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="lastName" sm={2}>E-mail</Label>
                                            <Col sm={10}>
                                                <Input  type="text" name="email"
                                                        id="email" disabled={this.state.accessInputField}
                                                        value={this.state.email}
                                                        onChange={this.handleEmailChange}
                                                        placeholder={this.state.email}
                                                        />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="profileImage" sm={2}>Zdjęcie profilowe</Label>
                                            <Col sm={10}>
                                                <Input type="file" name="profileImage"
                                                       id="profileImage" disabled={this.state.accessInputField}
                                                       value={this.state.images}
                                                       onChange={this.handleProfileImageChange}/>
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                </Col>
                                <Col sm="12" md={{size: 4, offset: 8}}>
                                     <Button outline color="success" onClick={this.handleChangeButton}>
                                                      Zatwierdź zmiany</Button>{' '}
                                     <Button outline color="primary" onClick={this.handleEditButton}>
                                                      Edytuj</Button>
                                </Col>
                            </Row>
                          </div>
                        </CardBody>
                    </Card>
                  </Col>
               </div>
        )
    }

    getUserDetails(){
        let self = this;
        this.userController.getUserDetails()
            .then(response => {
                console.log(response.data.description);
                self.setState(
                    {
                        nickName: response.data.username,
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        email: response.data.email,
                        userId: response.data.id
                    }
                )
            })
            .catch(error => {
                console.log(error);
            })
    }
}