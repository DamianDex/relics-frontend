import React from 'react';
import {Button, Input, InputGroup, InputGroupAddon, Nav, Navbar, NavbarBrand, NavItem} from 'reactstrap';
import LoginControl from '../components/LoginControl'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class CustomNavbar extends React.Component {

	static propTypes = {
		user_role: PropTypes.string,
    };

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
        const { user_role } = this.props;
        var searchBtn;
        let roleButton;
        let addButton;
        var roleNavPadding= "0px";
        if (user_role === 'USER') {
            roleButton = <Button outline color="primary" href="/my-profile">Mój profil</Button>
            roleNavPadding = "5px";
        } else if (user_role === 'ADMIN'){
            roleButton = <Button outline color="primary" href="/admin">Administracja</Button>
            roleNavPadding = "5px";
        }

        if(user_role === 'USER' || user_role === 'ADMIN'){
            addButton = <Button outline color="primary" href="/add">Dodaj</Button>
        }

        if (this.state.searchPhrase == "") {
            searchBtn = (
                <Button color="danger" outline disabled href={"/relics/" + this.state.searchPhrase}>Szukaj !</Button>);

        } else {
            searchBtn = (<Button color="success" outline href={"/relics/" + this.state.searchPhrase}>Szukaj !</Button>);

        }

        return (
            <div>
                <Navbar className="main-navbar" color="faded" light expand="md">
                    <NavbarBrand className="h1" href="/">Polskie Zabytki</NavbarBrand>
                    <div>
                        <InputGroup>
                            <Input value={this.state.searchPhrase} onChange={this.handleSearchPhrase}
                                   placeholder="Powiedz czego szukasz..."/>
                            <InputGroupAddon addonType="append">
                                {searchBtn}
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
                        <NavItem style={{padding: roleNavPadding}}>
                            {addButton}
                        </NavItem>
                        <NavItem style={{padding: roleNavPadding}}>
                            {roleButton}
                        </NavItem>
                        <NavItem style={{padding: '5px'}}>
                            <LoginControl/>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { user_role: state.user_role };
};

export default connect(mapStateToProps, null)(CustomNavbar);
