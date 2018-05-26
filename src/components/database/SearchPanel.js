import React, {Component} from "react";
import {Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label} from "reactstrap";
import VoivodeshipFilterDropdown from "../ranking/filter/VoivodeshipFilterDropdown";
import CategoryFilterDropdown from "../ranking/filter/CategoryFilterDropdown";

export default class SearchPanel extends Component {


    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Card>
                <CardHeader align="center">Opcje wyszukiwania</CardHeader>
                <CardBody>
                    <Form style={{padding: "15px"}}>
                        <br/>
                        <FormGroup row>
                            <Label for="identification" sm={4}>Nazwa zabytku</Label>
                            <Col sm={8}>
                                <Input value={this.props.searchPhrase} type="text" name="identification"
                                       id="identification"/>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="registerNumber" sm={4}>Numer w rejestrze</Label>
                            <Col sm={8}>
                                <Input type="text" name="registerNumber"
                                       id="registerNumber"/>
                            </Col>
                        </FormGroup>

                        <VoivodeshipFilterDropdown/>

                        <CategoryFilterDropdown labelName='Kategoria'/>

                        <div>
                            <Button outline color="success">Szukaj</Button>
                            {'   '}
                            <Button outline color="primary">Wyczyść</Button>
                        </div>

                    </Form>
                </CardBody>
            </Card>
        )
            ;
    }
}


