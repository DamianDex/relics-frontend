import React from 'react';
import ReactDOM from "react-dom";
import { Button } from "reactstrap";

export default class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
	window.location = '/login'
    //this.setState({isLoggedIn: true}); 
  }

  handleLogoutClick() {
    //this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;

    let button = null;
    if (isLoggedIn) {
      button = <Button color="primary" onClick={this.handleLogoutClick} >Logout</Button>;
    } else {
      button = <Button color="primary" onClick={this.handleLoginClick} >Login</Button>;
    }

    return (
      <div>
        {button}
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);

