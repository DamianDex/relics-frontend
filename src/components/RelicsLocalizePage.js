import React, {Component} from "react";
import SideBar from "../location/SideBar";
import Content from "../location/Content";
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import axios from "axios";
import RelicController from "../controllers/RelicController";


class RelicsLocalizePage extends Component {
	
	static propTypes = {
		route_relics: PropTypes.array,
		route_buffer: PropTypes.number,
		onRelicsBeingSearched: PropTypes.func,
		onRelicsSearched: PropTypes.func
    };
	
    constructor(props) {
        super(props);
        this.getInitialState = this.getInitialState.bind(this);
        this.handleViewSidebar = this.handleViewSidebar.bind(this);
        this.onSearchButtonClicked = this.onSearchButtonClicked.bind(this);
        this.relicsController = new RelicController();
        this.state = { sidebarOpen: true };
    }

    componentWillUpdate(nextProps, nextState) {
    	  if (nextProps.route_relics !== this.props.route_relics) {
    		  this.onSearchButtonClicked(nextProps.route_relics, nextProps.route_buffer);
    	  }
    	}
    
    getInitialState(){
        this.setState({ sidebarOpen: false});
    }
    
    handleViewSidebar(){
      	this.setState({sidebarOpen: !this.state.sidebarOpen});
    }
    
    onSearchButtonClicked(routeArray, buffer){
        var { onRelicsBeingSearched, onRelicsSearched } = this.props;
        onRelicsBeingSearched(true);
    	var response = this.relicsController.getRelicsInRouteBuffer(routeArray, buffer)
    	    .then(function(result) {
    	        onRelicsBeingSearched(false);
    	        onRelicsSearched(result.data.relics, result.data.bufferPoints);
    	});
    }
   

    render() {
        return (
            <div>
        	    <SideBar isOpen={this.state.sidebarOpen} onSearchButtonClicked={this.onSearchButtonClicked}/>
        	    <Content isOpen={this.state.sidebarOpen} handleViewSidebar={this.handleViewSidebar} />
        	</div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
		route_relics: state.route_relics,
    	route_buffer: state.route_buffer
    }
}

const mapDispatchToProps = (dispatch) => {
	  return {
	    onRelicsBeingSearched: (pending) => dispatch({ type: 'PROCESSING_RELICS', pending: pending}),
	    onRelicsSearched: (relics, buffer) => dispatch({ type: 'ROUTE_RELICS_FOUND', found_relics: relics,
	                                                                                 found_buffer: buffer})
	  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RelicsLocalizePage);

