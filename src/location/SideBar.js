import React, {Component} from "react";
import { Card, CardSubtitle, CardBody, CardHeader, CardFooter, InputGroup, Input, Button, ListGroup, ListGroupItem} from 'reactstrap'


export default class SideBar extends Component {
    constructor(props) {
        super(props);
    }
	
    render() {
        return (
        	<div id = "inner-remaining" className="sidebar">
        		<CardHeader>
        			Bufor odległości od trasy
        		</CardHeader>
        	    <InputGroup>
        	      	<CardSubtitle className="buffer-text" >Wielkość bufora [km]: </CardSubtitle>
        	       	<Input className="buffer-input" placeholder="Wpisz odległość od trasy..." type="number" step="1" min="0" />
        	     </InputGroup>
      	        <Button className="buffer-button" color="primary">Wyszukaj</Button>	
        		<CardHeader>
        			Odnalezione w buforze zabyki
        		</CardHeader>
        		<CardBody className="sidebar-list">
        			<ListGroup>
        				<ListGroupItem>
        					Pierwszy item
        				</ListGroupItem>
            			<ListGroupItem>
        					Pierwszy item
        				</ListGroupItem>
            			<ListGroupItem>
        					Pierwszy item
        				</ListGroupItem>
            			<ListGroupItem>
        					Pierwszy item
        				</ListGroupItem>
            			<ListGroupItem>
        					Pierwszy item
        				</ListGroupItem>
            			<ListGroupItem>
        					Pierwszy item
        				</ListGroupItem>
            				<ListGroupItem>
        					Pierwszy item
        				</ListGroupItem>
            			<ListGroupItem>
        					Pierwszy item
        				</ListGroupItem>
            			<ListGroupItem>
        					Pierwszy item
        				</ListGroupItem>
            			<ListGroupItem>
        					Pierwszy item
        				</ListGroupItem>
            			<ListGroupItem>
        					Pierwszy item
        				</ListGroupItem>
            			<ListGroupItem>
        					Pierwszy item
        				</ListGroupItem>
       				</ListGroup>
   				</CardBody>
        	</div>
        );
    }
}