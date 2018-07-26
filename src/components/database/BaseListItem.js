import React, {Component} from "react";
import {ListGroupItem} from 'reactstrap';
import RelicBaseCard from "./RelicBaseCard";

export default class BaseListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ListGroupItem>
                <RelicBaseCard relicId={this.props.id}/>
            </ListGroupItem>
        );
    }
}


