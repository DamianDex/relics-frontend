import React, {Component} from "react";
import SideBar from "../location/SideBar";
import Content from "../location/Content";

export default class RelicsLocalizePage extends Component {
    constructor(props) {
        super(props);
        this.getInitialState = this.getInitialState.bind(this);
        this.handleViewSidebar = this.handleViewSidebar.bind(this);
        this.state = { sidebarOpen: true };
    }

    getInitialState(){
        this.setState({ sidebarOpen: false });
    }
    
    handleViewSidebar(){
      	this.setState({sidebarOpen: !this.state.sidebarOpen});
    }

    render() {
        return (
            <div>
        	    <SideBar isOpen={this.state.sidebarOpen} />
        	    <Content isOpen={this.state.sidebarOpen} handleViewSidebar={this.handleViewSidebar} />
        	</div>
        );
    }
}
