import React from "react";
import {CardGroup} from "reactstrap";
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
            <CardGroup>
                {
                    this.state.IDs.map(function (name) {
                            return <RelicSmallCard name={name}/>;
                        }
                    )
                }
            </CardGroup>
        );
    }
}

export default RelicThreeSmallCardsDeck;