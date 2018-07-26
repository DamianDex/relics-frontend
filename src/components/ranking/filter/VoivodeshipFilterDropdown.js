import React, {Component} from "react";
import {FormGroup, Input, Label,Col} from 'reactstrap';
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
            <FormGroup class="voivodeship-filter" row>
                <Label for="exampleSelect" sm={this.props.voivodeshipLabelWidth}>Województwo</Label>
                <Col sm={this.props.voivodeshipInputWidth}>
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
                </Col>
            </FormGroup>
        );
    }

    getAllVoivodeships() {
        this.setState({
            voivodeships: VOIVODESHIPS
        })
    }
}


