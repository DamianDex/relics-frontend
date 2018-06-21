import React from 'react';
import {Button} from "reactstrap";
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {CONFIGURATION} from '../configuration/configuration'
import axios from 'axios';

class LoginControl extends React.Component {
    
	static propTypes = {
		logged: PropTypes.bool,

    };
	
	constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.endpoint = 'http://' + CONFIGURATION.HOST + ':' + CONFIGURATION.PORT
    }

    handleLoginClick() {
        window.location = '/login'
    }

    async handleLogoutClick() {
    	var response = await axios.get(this.endpoint + '/api/logout'); 
    	this.setState({loggingOut: true});
    	sessionStorage.clear("jwtToken");
    	window.location = "/login?logout";
    }

    render() {
    	const { logged } = this.props;
        
        let button = null;
        if (logged) {
            button = <Button outline color="success" onClick={this.handleLogoutClick}>Logout</Button>;
        } else {
            button = <Button outline color="success" onClick={this.handleLoginClick}>Login</Button>;
            
        }
        return (
            <div>
                {button}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
	  return { logged: state.logged };
};

export default connect(mapStateToProps, null)(LoginControl);
