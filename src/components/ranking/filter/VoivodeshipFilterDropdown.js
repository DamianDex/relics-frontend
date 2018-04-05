import React, {Component} from "react";
import {FormGroup, Input, Label} from 'reactstrap';
import CategoryController from "../../../controllers/CategoryController";
import "../../../constants/Voivodeships";
import {VOIVODESHIPS} from "../../../constants/Voivodeships";

export default class VoivodeshipFilterDropdown extends Component {
    constructor(props) {
        super(props);
        this.categoryController = new CategoryController();

        this.state = {
            voivodeships: ['']
        }
    }

    componentDidMount() {
        this.getAllVoivodeships();
    }

    render() {
        return (
            <FormGroup class="voivodeship-filter">
                <Label for="exampleSelect">Województwo</Label>
                <Input type="select"
                       name="voivodeship"
                       id="exampleSelect"
                       value={this.props.value}
                       onChange={this.props.onChangeValue}>
                    <option></option>
                    {
                        this.state.voivodeships.map(item => {
                            return (
                                <option>{item}</option>
                            );
                        })
                    }
                </Input>
            </FormGroup>
        );
    }

    getAllVoivodeships() {
        this.setState({
            voivodeships: VOIVODESHIPS
        })
    }
}


