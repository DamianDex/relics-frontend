import React, {Component} from "react";
import MapComponent from "../map/MapComponent";

export default class RelicProfilePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <p>Relics Profile Page will be here !!!: {this.props.match.params.relicId}</p>
                <p>Map</p>
                <MapComponent/>
            </div>
        );
    }
}


