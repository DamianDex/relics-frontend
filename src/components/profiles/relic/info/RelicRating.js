import React, {Component} from "react";
import {Card, CardBody, CardHeader} from "reactstrap";
import ReviewController from "../../../../controllers/ReviewController";
import "./RelicRating.css"
import UserController from "../../../../controllers/UserController";

export default class RelicRating extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.reviewController = new ReviewController();
        this.userController = new UserController();
    }

    componentDidMount() {
        this.getMyRating();
        this.getAvgRating();
        this.getRatingCount();
    }

    render() {
        return (
            <Card>
                <CardHeader>Wasze oceny</CardHeader>
                <CardBody>
                    <div class="ratings-body">
                        <b>Ocena użytkowników:</b> {Math.round(this.state.avg * 100) / 100} / 5.00 <br/>
                        <b>Liczba głosów:</b> {this.state.count} <br/>
                        <b>Twoja ocena:</b> {this.state.myRating} <br/>
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

    getMyRating() {
        let self = this;

        this.reviewController.getMyRating(this.props.id)
            .then(response => {

                if (response.data != "") {
                    self.setState(
                        {
                            myRating: response.data
                        }
                    )
                } else {
                    self.setState(
                        {
                            myRating: "--"
                        }
                    )
                }
            })
            .catch(error => {
                console.log(error);
            })

    }
}


