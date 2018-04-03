import React, {Component} from "react";
import RelicController from "../../controllers/RelicController";

export default class RelicRankingCard extends Component {
    constructor(props) {
        super(props);
        this.relicController = new RelicController();

        this.state = {
            identification: ''
        }
    }

    componentDidMount() {
        this.getRelicDetails();
    }

    render() {
        return (
            <div>
                <p>{this.state.identification}</p>
            </div>
        );
    }

    getRelicDetails() {
        let self = this;
        this.relicController.getRelicDetails(this.props.relicId)
            .then(response => {
                console.log(response);
                self.setState(
                    {
                        identification: response.data.identification
                    }
                )
            })
            .catch(error => {
                console.log(error);
            })
    }
}


