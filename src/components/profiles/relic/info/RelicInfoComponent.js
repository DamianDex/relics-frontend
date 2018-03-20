import React, {Component} from "react";
import RelicMainPhoto from "./RelicMainPhoto";
import RelicDetails from "./RelicDetails";
import RelicRating from "./RelicRating";
import {CardGroup} from "reactstrap";

export default class RelicInfoComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CardGroup>
                <RelicMainPhoto id={this.props.id}/>
                <RelicDetails id={this.props.id}/>
                <RelicRating id={this.props.id}/>
            </CardGroup>
        );
    }
}


