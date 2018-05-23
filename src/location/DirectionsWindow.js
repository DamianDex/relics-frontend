import React, {Component} from "react";
import {Card, CardBody, CardHeader, InputGroup, CardFooter, ListGroup, ListGroupItem, Col, Label, Button, Input, NavLink, Alert, Table} from 'reactstrap';

const { StandaloneSearchBox } = require("react-google-maps/lib/components/places/StandaloneSearchBox");

export default class DirectionsWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {rows: [], firstRender: true};
        this.addRow = this.addRow.bind(this);
        this.removeRow = this.removeRow(this);
        this.renderRow = this.renderRow.bind(this);
        this.setRendered = this.setRendered.bind(this);
    }
    
    componentDidMount() {
    	this.setState({firstRender:false})
        this.props.onRef(this)
    }
    
    componentWillUnmount() {
        this.props.onRef(undefined)
    }
    
    addRow() {
        var rows = this.state.rows;
        rows.push(rows.length + 1);
        this.setState({rows: rows});
    }
    
    removeRow(index){   	
    }
    
    setRendered(){
    	this.setState({firstRender: false})
    }
    
    renderDummyRow(type, index){
    	return ( 
        		<InputGroup key={index}>
    	    		<Input placeholder="Wpisz zapytanie" className={type}></Input>
      	    		<Button className="float-right">
      	    			<span className="glyphicon glyphicon-pushpin" />
       				</Button>
    	    	</InputGroup>
        	);    	
    }

    renderRow(type, index){
    	return ( 
    		<InputGroup key={index}>
    			<StandaloneSearchBox className="search-box" id={index}
	    			ref={this.props.props.onSearchBoxMounted}
	    			bounds={this.props.props.bounds}
    				onPlacesChanged={() => this.props.props.onPlacesChanged(index)}
    			>
	    			<Input className={type}></Input>
	    		</StandaloneSearchBox>

  	    		<Button className="float-right">
  	    			<span className="glyphicon glyphicon-pushpin" />
   				</Button>
	    	</InputGroup>
    	);
    }
    
    render() {
    	let startRow = this.renderRow("default", "0")
    	let endRow = null;
    	if (this.state.firstRender){
    		endRow = this.renderDummyRow("default", "end")
    	} else {
    		endRow = this.renderRow("default", "end")
    	}
        return (
        	<Card className="directions-card" >
        	<CardHeader className="directions-color">Trasa</CardHeader>
        		<CardBody className="scroller">
        			{startRow}
                    {this.state.rows.map((r) => (
                    	this.renderRow("default", r)
                    ))}
                    {endRow}
        		</CardBody>
        		<CardFooter className="directions-color">
    				<Button className="float-right" onClick={this.addRow}>
						Dodaj przystanek
					</Button>
				</CardFooter>
        	</Card>
        );
    }
}