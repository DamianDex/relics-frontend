import React, {Component} from "react";
import {Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label} from "reactstrap";
import CategoryFilterDropdown from "../../../ranking/filter/CategoryFilterDropdown";

export default class UserReviewsSearchPanel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            category: "",
            vote: ""
        }

        this.handleSearch = this.handleSearch.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleVoteChange = this.handleVoteChange.bind(this);
    }

    render() {
        return (
            <Card>
                <CardHeader align="center">Opcje wyszukiwania</CardHeader>
                <CardBody>
                    <Form style={{padding: "15px"}}>
                        <br/>
                        <FormGroup row>
                            <Label for="vote" sm={5}>Ocena
                            </Label>
                            <Col sm={7}>
                                <Input type="select" name="vote"
                                       id="vote"
                                       value={this.state.vote}
                                       onChange={this.handleVoteChange}>
                                        <option></option>
                                        <option>5</option>
                                        <option>4</option>
                                        <option>3</option>
                                        <option>2</option>
                                        <option>1</option>
                                </Input>
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

    handleVoteChange(e){
        this.setState({vote: e.target.value})
    }

    handleCategoryChange(e) {
        this.setState({category: e.target.value})
    }

    handleSearch() {
        this.props.filterHandler(this.state.vote, this.state.category);
    }
}
