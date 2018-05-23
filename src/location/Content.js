import React, {Component} from "react";
import "../location/Location.css";
import {Container, Button} from "reactstrap";
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"
import {SearchBox} from "react-google-maps/lib/components/places/SearchBox";

import MapWithLocations from "../location/MapWithLocations";
const _ = require("lodash");


export default class Content extends Component {
	
	constructor(props) {
		super(props);
	}
	
    render() {
        var contentClass = this.props.isOpen ? 'content open' : 'content';
        let span = null;
        if (this.props.isOpen) {
        	span = <span className="glyphicon glyphicon-chevron-left" />
        } else {
        	span = <span className="glyphicon glyphicon-chevron-right" />
        }
        return (
          <div id="inner_remaining" className={contentClass}>
  	    	<Button onClick={this.props.handleViewSidebar} className="sidebar-toggle">
       			{span}
       		</Button>
       		<MapWithLocations/>
       	</div>
        );
    }
}
