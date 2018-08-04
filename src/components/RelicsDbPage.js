import React, {Component} from "react";
import SearchPanel from "./database/SearchPanel";
import {Col, Row} from "reactstrap";
import ResultsPanel from "./database/ResultsPanel";


export default class RelicsDbPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            register: "",
            voivodeship: "",
            category: "",
            place: ""
        }

        this.handleFilter = this.handleFilter.bind(this);
    }

    handleFilter(name, register, voivodeship, category, place) {
        this.setState({
            name: name,
            register: register,
            voivodeship: voivodeship,
            category: category,
            place: place
        })
    }

    render() {
        return (
            <Row>
                <Col sm="3" md={{size: 3, offset: 1}}>
                    <br/>
                    <SearchPanel searchPhrase={this.props.match.params.search} filterHandler={this.handleFilter}/>
                </Col>
                <Col sm="7" md={{size: 7, offset: -1}}>
                    <br/>
                    <ResultsPanel name={this.state.name} register={this.state.register}
                                  voivodeship={this.state.voivodeship} category={this.state.category}
                                  place={this.state.place}/>
                </Col>
            </Row>
        );
    }
}


