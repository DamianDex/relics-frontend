import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
  } from 'reactstrap';
  import LoginControl from '../components/LoginControl'

export default class CustomNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar className="main-navbar" color="faded" light expand="md">
          <NavbarBrand className="h1" href="/">Relics of Leser Poland</NavbarBrand>
            <Nav className="ml-auto">
              <NavItem>
                <NavLink href="/my-profile/">My Profile</NavLink>
              </NavItem>
              <NavItem>
                <LoginControl />
              </NavItem>
            </Nav>
        </Navbar>
      </div>
    );
  }
}
