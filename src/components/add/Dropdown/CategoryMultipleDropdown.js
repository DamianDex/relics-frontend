import React, {Component} from "react";
import {FormGroup, Input, Label,Col} from 'reactstrap';
import CategoryController from "../../../controllers/CategoryController";

export default class CategoryMultipleDropdown extends Component {
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
            <FormGroup>
                <Label for="category" sm={2}>Kategoria</Label>
                <Col sm={10}>
                            <select name="category[]" id="inscompSelected" multiple="multiple" class="lstSelected"
                            value={this.state.value} onChange={this.handleChange}>
                    {
                        this.state.categories.map(item => {
                            return (
                                <option>{item}</option>
                            );
                        })
                    }
                            </select>
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
