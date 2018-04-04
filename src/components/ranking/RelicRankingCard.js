import React, {Component} from "react";
import RelicController from "../../controllers/RelicController";
import {Button} from "reactstrap";

export default class RelicRankingCard extends Component {
    constructor(props) {
        super(props);
        this.relicController = new RelicController();

        this.state = {
            id: '',
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
                <Button color="success" href={this.state.href}>Do profilu!</Button>
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
                        identification: response.data.identification,
                        href: 'relic/'.concat(response.data.id)
                    }
                )
            })
            .catch(error => {
                console.log(error);
            })
    }
}


