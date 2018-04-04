import React, {Component} from "react";
import {Card, CardBody, CardHeader} from "reactstrap";
import ReviewController from "../../../../controllers/ReviewController";
import "./RelicRating.css"

export default class RelicRating extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.reviewController = new ReviewController();
    }

    componentDidMount() {
        this.getAvgRating();
        this.getRatingCount();
    }

    render() {
        return (
            <Card>
                <CardHeader>Wasze oceny</CardHeader>
                <CardBody>
                    <div class="ratings-body">
                        <b>Ocena użytkowników:</b> {this.state.avg} / 5.0 <br/>
                        <b>Liczba głosów:</b> {this.state.count} <br/>
                        <b>Twoja ocena:</b> {this.state.registerNumber} <br/>
                    </div>
                </CardBody>
            </Card>
        );
    }

    getAvgRating() {
        let self = this;
        this.reviewController.getAvgRating(this.props.id)
            .then(response => {
                self.setState(
                    {
                        avg: response.data
                    }
                )
            })
            .catch(error => {
                console.log(error);
            })
    }

    getRatingCount() {
        let self = this;
        this.reviewController.getRatingCount(this.props.id)
            .then(response => {
                self.setState(
                    {
                        count: response.data
                    }
                )
            })
            .catch(error => {
                console.log(error);
            })
    }
}


