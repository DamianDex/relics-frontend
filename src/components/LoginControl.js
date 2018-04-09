import React from 'react';
import {Button} from "reactstrap";
import PropTypes from 'prop-types';
import { connect } from 'react-redux'


class LoginControl extends React.Component {
    
	static propTypes = {
		logged: PropTypes.bool,
		onLogin: PropTypes.func,
	    onLogout: PropTypes.func
    };
	
	constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleLoginClick() {
        window.location = '/login'
    }

    handleLogoutClick() {
    	const { onLogout } = this.props;
    	onLogout();
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

const mapDispatchToProps = (dispatch) => {
	  return {
	    onLogin: () => dispatch({ type: 'LOGIN' }),
	    onLogout: () => dispatch({ type: 'LOGOUT' })
	  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginControl);
