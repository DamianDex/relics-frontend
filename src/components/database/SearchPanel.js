import React, {Component} from "react";
import {Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label} from "reactstrap";
import VoivodeshipFilterDropdown from "../ranking/filter/VoivodeshipFilterDropdown";
import CategoryFilterDropdown from "../ranking/filter/CategoryFilterDropdown";

export default class SearchPanel extends Component {


    constructor(props) {
        super(props);

        this.state = {
            name: this.props.searchPhrase,
            register: "",
            category: "",
            voivodeship: "",
            place: ""
        }

        this.handleSearch = this.handleSearch.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleRegisterChange = this.handleRegisterChange.bind(this);
        this.handleVoivodeshipChange = this.handleVoivodeshipChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handlePlaceChange = this.handlePlaceChange.bind(this);
    }

    render() {
        return (
            <Card>
                <CardHeader align="center">Opcje wyszukiwania</CardHeader>
                <CardBody>
                    <Form style={{padding: "15px"}}>
                        <br/>
                        <FormGroup row>
                            <Label for="identification" sm={5}>Nazwa
                            </Label>
                            <Col sm={7}>
                                <Input value={this.state.name} onChange={this.handleNameChange} type="text"
                                       name="identification"
                                       id="identification"/>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="registerNumber" sm={5}>Rejestr</Label>
                            <Col sm={7}>
                                <Input value={this.state.register} onChange={this.handleRegisterChange} type="text"
                                       name="registerNumber"
                                       id="registerNumber"/>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="place" sm={5}>Miejscowość</Label>
                            <Col sm={7}>
                                <Input value={this.state.place} onChange={this.handlePlaceChange} type="text"
                                       name="place"
                                       id="place"/>
                            </Col>
                        </FormGroup>

                        <VoivodeshipFilterDropdown value={this.state.voivodeship}
                                                   voivodeshipLabelWidth={5}
                                                   voivodeshipInputWidth={7}
                                                   onChangeValue={this.handleVoivodeshipChange}/>

                        <CategoryFilterDropdown labelName='Kategoria' value={this.state.category}
                                                categoryLabelWidth={5}
                                                categoryInputWidth={7}
                                                onChangeValue={this.handleCategoryChange}/>

                        <div>
                            <Button outline color="success" onClick={this.handleSearch}>Szukaj</Button>
                            {'   '}
                            <Button outline color="primary">Wyczyść</Button>
                        </div>

                    </Form>
                </CardBody>
            </Card>
        );
    }

    handleNameChange(e) {
        this.setState({name: e.target.value})
    }

    handleRegisterChange(e) {
        this.setState({register: e.target.value})
    }

    handleVoivodeshipChange(e) {
        this.setState({voivodeship: e.target.value})
    }

    handleCategoryChange(e) {
        this.setState({category: e.target.value})
    }

    handlePlaceChange(e) {
        this.setState({place: e.target.value})
    }

    handleSearch() {
        this.props.filterHandler(this.state.name, this.state.register,
            this.state.voivodeship, this.state.category, this.state.place);
    }
}


