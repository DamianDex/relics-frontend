import React, {Component} from "react";
import {Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label} from "reactstrap";
import CategoryFilterDropdown from "../../../ranking/filter/CategoryFilterDropdown";

export default class UserRelicsToSeeSearchPanel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            category: "",
            place: ""
        }

        this.handleSearch = this.handleSearch.bind(this);
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
                            <Label for="place" sm={5}>Miejscowość</Label>
                            <Col sm={7}>
                                <Input value={this.state.place} onChange={this.handlePlaceChange} type="text"
                                       name="place"
                                       id="place"/>
                            </Col>
                        </FormGroup>
                        <CategoryFilterDropdown labelName='Kategoria' value={this.state.category}
                                                categoryLabelWidth={5}
                                                categoryInputWidth={7}
                                                onChangeValue={this.handleCategoryChange}/>

                        <div>
                            <Button outline color="success" onClick={this.handleSearch}>Szukaj</Button>
                        </div>

                    </Form>
                </CardBody>
            </Card>
        );
    }

    handlePlaceChange(e){
        this.setState({place: e.target.value})
    }

    handleCategoryChange(e) {
        this.setState({category: e.target.value})
    }

    handleSearch() {
        this.props.filterHandler(this.state.category,this.state.place);
    }
}
