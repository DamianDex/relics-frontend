import React from "react";
import {CardDeck} from "reactstrap";
import RelicSmallCard from "./RelicSmallCard";

class RelicThreeSmallCardsDeck extends React.Component {
    constructor(props) {
        super(props);
        this.fetchThreeRandomRelicsIds();

        this.state = {
            IDs: [1, 2, 3]
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
                            return <RelicSmallCard/>;
                        }
                    )
                }
            </CardDeck>
        );
    }
}

export default RelicThreeSmallCardsDeck;