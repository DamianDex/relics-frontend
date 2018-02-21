import React from "react";
import axios from 'axios';
import { Button, InputGroup, InputGroupAddon, Input } from 'reactstrap';

class RelicNew extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick(e) {
        console.log("Clicked!!");
        axios.post('http://localhost:8080/api/relics', {
            categories: [
                {
                    categoryDescription: "aaa",
                    categoryName: "aaa"
                }
            ],
            communeName: "string",
            districtName: "string",
            latitude: 0,
            longitude: 0,
            placeName: "string",
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
            <div>
                <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend">Name</InputGroupAddon>
                    <Input />
                </InputGroup>
                <br/>
                <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend">Name</InputGroupAddon>
                    <Input />
                </InputGroup>
                <br/>
                <Button color="primary" onClick={this.handleClick}>Create new Relic !</Button>
            </div>
        );
    }
}

export default RelicNew;