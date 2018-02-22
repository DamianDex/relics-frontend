import React from "react";
import axios from 'axios';
import { Button, InputGroup, InputGroupAddon, Input } from 'reactstrap';

class RelicNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            placeName: ""
        };

        this.handlePlaceNameChange = this.handlePlaceNameChange.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }

    handlePlaceNameChange(e) {
        this.setState({placeName: e.target.value})
    }

    handleClick(e) {
        console.log("Clicked!!");

        var var_placeName = this.state.placeName;

        axios.post('http://localhost:8080/api/relics', {
            categories: [
                {
                    categoryName: "aaa"
                }
            ],
            communeName: "string",
            districtName: "string",
            latitude: 0,
            longitude: 0,
            placeName: var_placeName,
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
                    <InputGroupAddon addonType="prepend">Place Name</InputGroupAddon>
                    <Input type="text" placeholder="Pass place name..." value={this.state.placeName} onChange={this.handlePlaceNameChange} />
                </InputGroup>
                <br/>
                <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend">Commune Name</InputGroupAddon>
                    <Input />
                </InputGroup>
                <br/>
                <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend">District Name</InputGroupAddon>
                    <Input />
                </InputGroup>
                <br/>
                <Button color="primary" onClick={this.handleClick}>Create new Relic !</Button>
            </div>
        );
    }
}

export default RelicNew;