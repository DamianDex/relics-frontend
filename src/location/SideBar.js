import React, {Component} from "react";
import { Card, CardSubtitle, CardBody, CardHeader, CardFooter, InputGroup, Input, Button, ListGroup, ListGroupItem} from 'reactstrap'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

class SideBar extends Component {
    
	static propTypes = {
		route_searched: PropTypes.number,
		onSearch: PropTypes.func,
    };
	
	constructor(props) {
        super(props);
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleBufferChange = this.handleBufferChange.bind(this);
        this.state = {buffer: 0};
    }

    handleSearchClick(index) {
    	var { route_searched, onSearch } = this.props;
    	if (typeof route_searched === 'undefined'){
    		route_searched = 0
    	}
    	onSearch(route_searched + 1, this.state.buffer);
    }
    
    handleBufferChange(e) {
    	this.setState({ buffer: e.target.value })
    }
	
    render() {
    	const { route_searched } = this.props;
        let button = null;
        if (route_searched === 1) {
            button = <Button className="buffer-button" color="primary" onClick={() => this.handleSearchClick(0)}>Wyszukaj</Button>	
        } else {
            button = <Button className="buffer-button" color="primary" onClick={() => this.handleSearchClick(1)}>Wyszukaj</Button>	
        }   	
        return (
        	<div id = "inner-remaining" className="sidebar">
        		<CardHeader>
        			Bufor odległości od trasy
        		</CardHeader>
        	    <InputGroup className="buffer-group">
        	      	<CardSubtitle className="buffer-text" >Wielkość bufora [km]: </CardSubtitle>
        	       	<Input className="buffer-input" placeholder="Wpisz odległość od trasy..." type="number" step="1" min="0" 
        	       		value={this.state.buffer} onChange={this.handleBufferChange}/>
        	     </InputGroup>
        	     {button}
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

const mapDispatchToProps = (dispatch) => {
	  return {
	    onSearch: (searched, buffer) => dispatch({ type: 'SEARCH_ROUTE', dir_searched: searched, route_buffer: buffer}),
	  }
};

const mapStateToProps = (state) => {
    return {
    	route_searched: state.route_searched
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);

