import React, {Component} from "react";
import {Button, ButtonGroup,Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label} from "reactstrap";
import "./DbStyle.css";

export default class PagesChooser extends Component {


    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1,
            loadLess: false,
        }
        this.handleNextPage = this.handleNextPage.bind(this);
        this.handlePreviousPage = this.handlePreviousPage.bind(this);
        this.setPageToFirst = this.setPageToFirst.bind(this);
    }

    render() {
        return (
                <ButtonGroup className="pages-chooser">
  	    		    <Button outline color="primary.active" active={this.state.loadLess} onClick={this.handlePreviousPage}>
       				    <span className="glyphicon glyphicon-chevron-left" />
       				</Button>
       				<Input className="pages-chooser-input" value={this.state.currentPage} />
    		        <Button outline color="primary.active" active={this.props.loadMore} onClick={this.handleNextPage}>
       				    <span className="glyphicon glyphicon-chevron-right" />
       				</Button>
                </ButtonGroup>
        );
    }

    handleNextPage() {
        if (this.props.loadMore){
                this.setState({currentPage: this.state.currentPage + 1})
                this.props.handleChange(this.state.currentPage);
        }
    }

    handlePreviousPage() {
        if (this.state.currentPage === 2){
            this.setState({loadLess: false})
        }
        if (this.state.currentPage > 1){
            this.setState({currentPage: this.state.currentPage - 1})
            this.props.handleChange(this.state.currentPage);
        }
    }

    setPageToFirst() {
        this.setState({currentPage: 1, loadLess: false})
    }

}


