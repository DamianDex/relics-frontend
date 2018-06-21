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
    	  if (nextProps.route_relics != this.props.route_relics) {
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
    	this.relicsController.getRelicsInRouteBuffer(routeArray, buffer);
//        axios.get('http://localhost:8090/api/relics/route-buffer', {
//        	routeArray: routeArray,
//        	buffer: buffer
//        }, {
//            headers: {
//                'Accept': 'application/json',
//                'Content-Type': 'application/json',
//                'authorization': sessionStorage.getItem("jwtToken")
//            }
//        }).then(function (response) {
//                console.log(response);
//        }).catch(function (error) {
//                console.log(error);
//        });
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

export default connect(mapStateToProps)(RelicsLocalizePage);

