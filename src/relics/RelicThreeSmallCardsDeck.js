import React from "react";
import {CardDeck} from "reactstrap";
import RelicSmallCard from "./RelicSmallCard";

class RelicThreeSmallCardsDeck extends React.Component {
    constructor(props) {
        super(props);
        this.fetchThreeRandomRelicsIds();

        this.state = {
            IDs: ["Zabytek 1", "Zabytek 2"]
        };
    }

    fetchThreeRandomRelicsIds() {
        console.log("Execute in constructor");
    }

    render() {
        return (
            <CardDeck>
                {
                    this.state.IDs.map(function (name, index) {
                            return <RelicSmallCard name={name}/>;
                        }
                    )
                }
            </CardDeck>
        );
    }
}

export default RelicThreeSmallCardsDeck;