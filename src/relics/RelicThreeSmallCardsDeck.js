import React from "react";
import {CardGroup} from "reactstrap";
import RelicSmallCard from "./RelicSmallCard";
import RelicController from "../controllers/RelicController";

export default class RelicThreeSmallCardsDeck extends React.Component {
    constructor(props) {
        super(props);
        this.relicController = new RelicController();
        this.state = {
            IDs: []
        };
    }

    componentDidMount() {
        this.getRandomRelicIDs();
    }

    render() {
        return (
            <CardGroup>
                {
                    this.state.IDs.map(id => {
                            return <RelicSmallCard name={id}/>;
                        }
                    )
                }
            </CardGroup>
        );
    }

    getRandomRelicIDs() {
        let self = this;
        this.relicController.getRandomRelicIds(3)
            .then(response => {
                self.setState(
                    {
                        IDs: response.data
                    }
                )
            })
            .catch(error => {
                console.log(error);
            })
    }
}