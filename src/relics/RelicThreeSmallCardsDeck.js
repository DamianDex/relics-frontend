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
        this.getThreeCloseToMeRandomRelics(this.props.latitude, this.props.longitude, this.props.maximum);
    }

    render() {
        return (
            <CardGroup>
                {
                    this.state.IDs.map(id => {
                            return <RelicSmallCard id={id}/>;
                        }
                    )
                }
            </CardGroup>
        );
    }

    getRandomRelicIDs() {
        let self = this;
        this.relicController.getRandomRelicIds(4)
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

    getThreeCloseToMeRandomRelics(latitude, longitude, maximum) {
        let self = this;
        this.relicController.getRandomRelicIDsByDistance(4, latitude, longitude, maximum)
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