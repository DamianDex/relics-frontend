import React from 'react';
import {Button, Col, Input, InputGroup, InputGroupAddon, Nav, Navbar, NavbarBrand, NavItem, Row} from 'reactstrap';
import LoginControl from '../components/LoginControl'

export default class CustomNavbar extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            searchPhrase: ''
        };

        this.handleSearchPhrase = this.handleSearchPhrase.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleSearchPhrase(e) {
        this.setState({searchPhrase: e.target.value})
    }

    render() {
        return (
            <Row>
                <br/>
                <Col sm="12" md={{size: 10, offset: 1}}>
                    <Navbar className="main-navbar" color="faded" light expand="md">
                        <NavbarBrand className="h1" href="/">Polskie Zabytki</NavbarBrand>
                        <div>
                            <InputGroup>
                                <Input value={this.state.searchPhrase} onChange={this.handleSearchPhrase}
                                       placeholder="Powiedz czego szukasz..."/>
                                <InputGroupAddon addonType="append">
                                    <Button href={"/relics/" + this.state.searchPhrase}>Szukaj !</Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </div>

                        <Nav className="ml-auto">
                            <NavItem style={{padding: '5px'}}>
                                <Button outline color="primary" href="/relics">Baza</Button>
                            </NavItem>
                            <NavItem style={{padding: '5px'}}>
                                <Button outline color="primary" href="/localize">Lokalizacja</Button>
                            </NavItem>
                            <NavItem style={{padding: '5px'}}>
                                <Button outline color="primary" href="/ranking">Ranking</Button>
                            </NavItem>
                            <NavItem style={{padding: '5px'}}>
                                <Button outline color="primary" href="/add">Dodaj</Button>
                            </NavItem>
                            <NavItem style={{padding: '5px'}}>
                                <Button outline color="primary" href="/my-profile">Mój profil</Button>
                            </NavItem>
                            <NavItem style={{padding: '5px'}}>
                                <LoginControl/>
                            </NavItem>
                        </Nav>
                    </Navbar>
                </Col>
            </Row>
        );
    }
}
