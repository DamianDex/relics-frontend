import React, {Component} from "react";
import "../location/Location.css";
import {Gmaps} from "react-gmaps";
import {Container, Button} from "reactstrap";


const params = {v: '3.exp', key: 'AIzaSyCbRbS00bDAmgSC0zAwQPyAAX4DZMHd9aI'};

export default class Content extends Component {
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
	       	<Gmaps
	       		width={'100%'}
	       		height={'100%'}
	       		lat='52'
	       		lng='19'
	       		zoom={7}
	       		loadingMessage={'Loading...'}
	       		params={params}
	       		onMapCreated={this.onMapCreated}>
	       	</Gmaps>
          </div>
        );
    }
}
