import React, { Component } from "react";
import { Row, Col, CardImg, ListGroupItem, Button, NavLink } from 'reactstrap'


export default class LocationsListItem extends Component {

        constructor(props) {
            super(props);
            const href = '/relic/' + this.props.relic.id;
            this.state = {imageSrc: '/images/icon.jpg', href: href}
        }

        render(){
            var itemClass;
            if (this.props.marked){
                itemClass = "marked-list-item";
            } else {
                itemClass = "list-item";
            }

            return(
        	    <ListGroupItem style={this.props.style} key={this.props.relic.id} className={itemClass}>
        		    <Row>
        		    <Button className="list-item-button" onClick={() => this.props.handleZoom(this.props.relic.geographicLocation.latitude, this.props.relic.geographicLocation.longitude)}>
                        <span className="glyphicon glyphicon-globe" />
                    </Button>
                        <Col xs="5">
        		            <CardImg top width="100%" src={process.env.PUBLIC_URL + this.state.imageSrc} alt="Card image cap"/>
                        </Col>
                        <Col xs="7">
                           <b>Nazwa: </b>{this.props.relic.identification}<br/>
                           <b>Datowany: </b>{this.props.relic.datingOfObject} <br/>
                           <b>Miejscowość: </b> {this.props.relic.geographicLocation.placeName}<br/>
                        </Col>
                    </Row>
                    <div className="list-item-text">
                        <Button>
                        <NavLink target="_blank" style={{display:'contents'}} href={this.state.href}>Profil zabytku <span className="glyphicon glyphicon-arrow-right"/></NavLink>
                        </Button>
                    </div>
        		</ListGroupItem>
            )
        }
}
