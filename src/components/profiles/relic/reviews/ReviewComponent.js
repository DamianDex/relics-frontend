import React, {Component} from "react";
import {Button, Card, CardBody, CardHeader, CardText, FormGroup, Input} from "reactstrap";
import ReviewController from "../../../../controllers/ReviewController";

export default class ReviewComponent extends Component {
    constructor(props) {
        super(props);

        this.reviewController = new ReviewController();

        this.state = {
            reviews: [],
            isReviewed: false
        }

        this.postReview = this.postReview.bind(this);

    }

    componentDidMount() {
        this.getRelicReviews();
        this.checkIfUserReviewRelic();
    }

    render() {

        if ((!this.state.isReviewed) && (this.state.reviews.length > 0)) {
            return (
                <div>
                    {this.renderReviewForm()}
                    {this.renderReviews()}
                </div>
            )
        }

        if (this.state.reviews.length > 0) {
            return (
                <div>
                    {this.renderReviews()}
                </div>
            );
        }

        if (!this.state.isReviewed) {
            return (
                <div>
                    {this.renderReviewForm()}
                </div>
            )
        }

    }

    postReview() {
        this.reviewController.postReview(1, 10, 10);
    }

    renderReviewForm() {
        return (
            <div>
                <Card>
                    <CardHeader>Czekamy na Twoją opinię!</CardHeader>
                    <CardBody>
                        <FormGroup>
                            <Input type="select">
                                <option>Wybierz swoją ocenę...</option>
                                <option>Rewelacja (5)</option>
                                <option>Bardzo fajne miejsce (4)</option>
                                <option>Naprawdę warto (3)</option>
                                <option>Tylko, gdy będziesz w pobliżu (2)</option>
                                <option>Stanowczo odradzam (1)</option>
                            </Input>
                            <Input type="textarea" placeholder="Miejsce na Twój komentarz..." name="text"
                                   id="exampleText"/>
                        </FormGroup>
                        <Button color="primary" onClick={this.postReview}>Zatwierdź ocenę!</Button>
                    </CardBody>
                </Card>
                <br/>
            </div>
        );
    }

    renderReviews() {
        return (
            this.state.reviews.map((item, index) => (
                <div>
                    <Card>
                        <CardHeader>Nazwa użytkownika</CardHeader>
                        <CardBody>
                            <CardText>Ocena: {item.rating} / 10</CardText>
                            <p>Recenzja: {item.comment}</p>
                        </CardBody>
                    </Card>
                    <br/>
                </div>
            )));
    }

    getRelicReviews() {
        let self = this;
        this.reviewController.getAllReviewsByRelicId(this.props.id)
            .then(response => {
                self.setState(
                    {
                        reviews: response.data
                    }
                )
            })
            .catch(error => {
                console.log(error);
            })
    }

    checkIfUserReviewRelic() {
        let self = this;
        this.reviewController.checkIfUserReviewRelic(10, 10)
            .then(response => {
                self.setState(
                    {
                        isReviewed: false
                    }
                )
            })
            .catch(error => {
                console.log(error);
            });
    }

}