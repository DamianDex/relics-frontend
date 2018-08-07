import React, {Component} from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, CardSubtitle } from 'reactstrap';
import axios from 'axios';
import {CONFIGURATION} from '../configuration/configuration'
import AdminRelicsTab from './admin/AdminRelicsTab'
import {Alert} from 'reactstrap';


const NOT_AUTHORIZED_MESSAGE = "Nie masz uprawnień do przeglądania tej strony, zaloguj się na konto administratora!"

export default class AdminMainPage extends Component {

	constructor(props) {
        super(props);
        this.authorize = this.authorize.bind(this);
        this.toggle = this.toggle.bind(this);
        this.endpoint = 'http://' + CONFIGURATION.HOST + ':' + CONFIGURATION.PORT;
        this.state = {errorMessage: "", isLoading: true, activeTab: '1'};
    }

    componentWillMount() {
        this.authorize();
    }

      toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
      }

    async authorize() {
        await axios.get(this.endpoint + '/api/admin', {
         	headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': sessionStorage.getItem("jwtToken")
             }},
             {withCredentials: true})
        .then((response) => {
            this.setState({isLoading: false})
        }).catch((error) => {
            if (error.response){
                this.setState({errorMessage: NOT_AUTHORIZED_MESSAGE})
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request){
                this.setState({errorMessage: NOT_AUTHORIZED_MESSAGE})
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
            this.setState({isLoading: false})
        })
        return false;
    }

    render() {
        var hasPermission = this.state.errorMessage === ""
    	let body = null;
    	if ( !this.state.isLoading ){
     	    if (hasPermission){
     	        body = <div><Nav tabs>
                        <NavItem>
                            <NavLink
                                className={'{ active: this.state.activeTab === \'1\' }'}
                                onClick={() => { this.toggle('1'); }}
                            >
                                Zabytki
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={'{ active: this.state.activeTab === \'2\' }'}
                                onClick={() => { this.toggle('2'); }}
                            >
                                Komentarze
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <AdminRelicsTab />
                        <TabPane tabId="2">
                            <Row>
                                <Col sm="6">
                                    <Card body>
                                        <CardTitle>Special Title Treatment</CardTitle>
                                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                        <Button>Go somewhere</Button>
                                    </Card>
                                </Col>
                                <Col sm="6">
                                    <Card body>
                                        <CardTitle>Special Title Treatment</CardTitle>
                                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                        <Button>Go somewhere</Button>
                                    </Card>
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent></div>
     	    } else {
     	        body = <Alert color="danger">{this.state.errorMessage}</Alert>
     	    }
    	} else {
    	    body = <p></p>
    	}

        return (
            <Col sm="12" md={{size: 10, offset: 1}}>{body}</Col>
        );
    }
}
