import React, {Component} from "react";
import {ListGroupItem} from 'reactstrap';
import UserRelicBaseCard from "./UserRelicBaseCard";

export default class UserRelicListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ListGroupItem>
                <UserRelicBaseCard relicId={this.props.id}/>
            </ListGroupItem>
        );
    }
}


