import React, {Component} from "react";
import RelicMainPhoto from "./RelicMainPhoto";
import RelicDetails from "./RelicDetails";
import RelicRating from "./RelicRating";
import {CardGroup} from "reactstrap";
import RelicController from "../../../../controllers/RelicController";

export default class RelicInfoComponent extends Component {
    constructor(props) {
        super(props);

        this.relicController = new RelicController();

        this.state = {
            identification: '',
            description: '',
            geographicLocation: '',
            categories: [],
            registerNumber: '',
            datingOfObject: ''
        }
    }

    componentDidMount() {
        this.getRelicDetails();
    }

    getRelicDetails() {
        let self = this;
        this.relicController.getRelicDetails(this.props.id)
            .then(response => {
                console.log(response);
                self.setState(
                    {
                        identification: response.data.identification,
                        registerNumber: response.data.registerNumber
                    }
                )
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <CardGroup>
                <RelicMainPhoto id={this.props.id} identification={this.state.identification}
                                registerNumber={this.state.registerNumber}/>
                <RelicDetails id={this.props.id}/>
                <RelicRating id={this.props.id}/>
            </CardGroup>
        );
    }
}