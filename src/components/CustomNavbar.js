import React from 'react';
import {Button, Input, InputGroup, InputGroupAddon, Nav, Navbar, NavbarBrand, NavItem, NavLink} from 'reactstrap';
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
                    <NavbarBrand className="h1" href="/">Polskie Zabytki</NavbarBrand>

                    <div>
                        <InputGroup>
                            <Input placeholder="Zacznij coś pisać..."/>
                            <InputGroupAddon addonType="append">
                                <Button>Szukaj !</Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </div>

                    <Nav className="ml-auto">
                        <NavItem>
                            <NavLink href="/relics">Baza zabytków</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/localize">Zlokalizuj zabytek</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/ranking">Ranking zabytków</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/add">Dodaj zabytek</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/my-profile/">Moje konto</NavLink>
                        </NavItem>
                        <NavItem>
                            <LoginControl/>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}
