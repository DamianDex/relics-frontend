import React, {Component} from "react";
import {ListGroupItem} from 'reactstrap';
import UserRelicsToSeeBaseCard from "./UserRelicsToSeeBaseCard";

export default class UserRelicsToSeeListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ListGroupItem>
                <UserRelicsToSeeBaseCard relicId={this.props.id}/>
            </ListGroupItem>
        );
    }
}
