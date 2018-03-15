import React, {Component} from "react";

export default class RelicProfilePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <p>Relics Profile Page will be here !!!: {this.props.match.params.relicId}</p>
        );
    }
}


