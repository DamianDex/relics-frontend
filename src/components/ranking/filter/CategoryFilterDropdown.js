import React, {Component} from "react";
import {FormGroup, Input, Label,Col} from 'reactstrap';
import CategoryController from "../../../controllers/CategoryController";

export default class CategoryFilterDropdown extends Component {
    constructor(props) {
        super(props);
        this.categoryController = new CategoryController();

        this.state = {
            categories: ['']
        }
    }

    componentDidMount() {
        this.getAllCategoryNames();
    }

    render() {
        return (
            <FormGroup row>
                <Label for="exampleSelect1" sm={this.props.categoryLabelWidth}>{this.props.labelName}</Label>
                <Col sm={this.props.categoryInputWidth}>
                <Input type="select" name="category"
                       id="exampleSelect1"
                       value={[this.props.value]}
                       onChange={this.props.onChangeValue}>
                    <option></option>
                    {
                        this.state.categories.map(item => {
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

    getAllCategoryNames() {
        let self = this;
        this.categoryController.getAllCategories()
            .then(response => {
                self.setState(
                    {
                        categories: response.data
                    }
                )
            })
            .catch(error => {
                console.log(error);
            })
    }

}


