import React, {Component} from "react";
import {FormGroup, Input, Label, Col} from 'reactstrap';

export default class AdminNameFilter extends Component {
    constructor(props) {
        super(props);
        this.handleRelicNameChange = this.handleRelicNameChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.state = {
            relicName: ''
        }
    }

    render() {
        return (
            <FormGroup row>
                <Label for="identification" sm={4}>Nazwa</Label>
                    <Col sm={8}>
                        <Input value={this.state.relicName} onChange={this.handleRelicNameChange} type="text"
                            name="identification"
                            id="identification"/>
                    </Col>
            </FormGroup>
        );
    }

    handleRelicNameChange(e) {
        this.setState({relicName: e.target.value})
    }

    handleSearch(){
        return this.state.relicName;
    }

    handleClear() {
        this.setState({relicName: ''});
    }

}


