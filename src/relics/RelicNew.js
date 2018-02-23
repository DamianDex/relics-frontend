import React from "react";
import axios from "axios";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";

class RelicNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            placeName: "",
            communeName: "",
            categories: []
        };

        this.handlePlaceNameChange = this.handlePlaceNameChange.bind(this);
        this.handleCommuneNameChange = this.handleCommuneNameChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }

    handlePlaceNameChange(e) {
        this.setState({placeName: e.target.value})
    }

    handleCommuneNameChange(e) {
        this.setState({communeName: e.target.value})
    }

    handleCategoryChange(e) {

        var categories = [];
        var options = e.target.options;

        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                categories.push({categoryName: options[i].value});
            }
        }
        this.setState({categories: categories});
        console.log(categories);
    }

    handleClick(e) {
        console.log("Clicked!!");

        var placeName = this.state.placeName;
        var communeName = this.state.communeName;
        var categories = this.state.categories;

        axios.post('http://localhost:8080/api/relics', {
            categories: categories,
            communeName: communeName,
            districtName: "string",
            latitude: 0,
            longitude: 0,
            placeName: placeName,
            voivodeshipName: "string"
        }, {
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <Label>Place Name</Label>
                    <Input type="text" placeholder="Place name" value={this.state.placeName}
                           onChange={this.handlePlaceNameChange}/>
                </FormGroup>
                <FormGroup size="sm">
                    <Label>Commune Name</Label>
                    <Input type="text" placeholder="Commune name" value={this.state.communeName}
                           onChange={this.handleCommuneNameChange}/>
                </FormGroup>
                <FormGroup>
                    <Label>Categories</Label>
                    <Input type="select" name="selectMulti" multiple onChange={this.handleCategoryChange}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Input>
                </FormGroup>
                <Button color="primary" onClick={this.handleClick}>Create Relic</Button>
            </Form>
        );
    }
}

export default RelicNew;