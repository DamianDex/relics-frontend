import React, {Component} from "react";
import {ListGroupItem} from 'reactstrap';
import RelicRankingCard from "./RelicRankingCard";

export default class RankingListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ListGroupItem>
                <RelicRankingCard relicId={this.props.id}/>
            </ListGroupItem>
        );
    }
}


