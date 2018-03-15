import React from "react";
import {CardDeck} from "reactstrap";
import RelicSmallCard from "./RelicSmallCard";
import axios from "axios";

class RelicThreeSmallCardsDeck extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            IDs: []
        };
    }

    componentDidMount() {
        let self = this;
        axios.get('http://localhost:8080/api/relics/random/3')
            .then(function (response) {
                console.log(response.data);
                self.setState(
                    {
                        IDs: response.data
                    }
                )
            })
            .catch(function (error) {
                console.log(error);
            });
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