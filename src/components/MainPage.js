import React, {Component} from "react";
import "../App.css";
import RelicsRecommendedByDistance from "../relics/RelicRecommendedByDistance";
import RelicsRecommendedByUsers from "../relics/RelicRecommendedByUsers";
import RandomRelics from "../relics/RandomRelics";

export default class MainPage extends Component {
    constructor(props) {
        super(props);

        this.handleChangeDistance = this.handleChangeDistance.bind(this);
    }

    handleChangeDistance(e) {
        this.setState({
            maximum: e.target.value
        })
    }

    render() {
        return (
            <div>
                <br/>
                <RandomRelics/>
                <br/>
                <RelicsRecommendedByDistance latitude='49.9888913'
                                             longitude='19.904049699999998'/>

                <br/>
                <br/>
                <RelicsRecommendedByUsers/>
                <br/>
            </div>
        );
    }
}