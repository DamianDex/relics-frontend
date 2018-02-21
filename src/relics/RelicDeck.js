import React from "react";
import {CardDeck} from "reactstrap";
import RelicCard from "./RelicCard";

class RelicDeck extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CardDeck>
                <RelicCard name="Zabytek 1" categories="kategoria1, kategoria2" description="Lorem ipsum dolor sit amet."/>
                <RelicCard name="Zabytek 1" categories="kategoria1, kategoria2" description="Lorem ipsum dolor sit amet."/>
                <RelicCard name="Zabytek 1" categories="kategoria1, kategoria2" description="Lorem ipsum dolor sit amet."/>
            </CardDeck>
        );
    }
}

export default RelicDeck;