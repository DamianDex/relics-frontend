import React, {Component} from "react";
import {Button, Card, CardBody, CardHeader, FormGroup, Input} from "reactstrap";
import ReviewController from "../../../../controllers/ReviewController";
import SingleReviewComponent from "./SingleReviewComponent";
import UserController from "../../../../controllers/UserController";

export default class ReviewComponent extends Component {
    constructor(props) {
        super(props);

        this.reviewController = new ReviewController();
        this.userController = new UserController();

        this.state = {
            reviews: [],
            isReviewed: false,
            comment: '',
            rating: '',
        }

        this.postReview = this.postReview.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.handleRatingChange = this.handleRatingChange.bind(this);
    }

    componentDidMount() {
        this.getRelicReviews();
        this.checkIfUserReviewRelic();
        this.checkIfUserIsLogged();
    }

    handleRatingChange(e) {
        this.setState({rating: e.target.value})
    }

    handleCommentChange(e) {
        this.setState({comment: e.target.value})
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
        this.reviewController.postReview(this.props.id, this.state.rating, this.state.comment);
    }

    renderReviewForm() {

        var disabled, text;

        if (this.state.isLogged) {
            disabled = false;
            text = "Czekamy na Twoją opinię!";
        } else {
            disabled = true;
            text = "Czekamy na Twoją opinię! - zaloguj się, aby oceniać";
        }

        return (
            <div>
                <Card>
                    <CardHeader>{text}</CardHeader>
                    <CardBody>
                        <div style={{padding: "15px"}}>
                            <FormGroup>
                                <Input type="select" disabled={disabled} value={this.state.rating}
                                       onChange={this.handleRatingChange}>
                                    <option>Wybierz swoją ocenę...</option>
                                    <option>5</option>
                                    <option>4</option>
                                    <option>3</option>
                                    <option>2</option>
                                    <option>1</option>
                                </Input><br/>
                                <Input value={this.state.comment} disabled={disabled} type="textarea"
                                       placeholder="Miejsce na Twój komentarz..."
                                       name="text"
                                       id="exampleText" onChange={this.handleCommentChange}/>
                            </FormGroup>
                            <Button color="primary" outline hidden={disabled} onClick={this.postReview}>Zatwierdź
                                ocenę!</Button>
                        </div>
                    </CardBody>
                </Card>
                <br/>
            </div>
        );
    }

    renderReviews() {
        return (
            this.state.reviews.map((review, index) => (
                <SingleReviewComponent username={review.appUser.username}
                                       creationDate={review.creationDate}
                                       rating={review.rating}
                                       comment={review.comment}
                                       votes={review.votes}
                                       id={review.id}/>
            )));
    }

    getRelicReviews() {
        let self = this;
        this.reviewController.getAllReviewsByRelicId(this.props.id)
            .then(response => {
                console.log(response);
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
        this.reviewController.checkIfUserReviewRelic(this.props.id)
            .then(response => {
                self.setState(
                    {
                        isReviewed: response.data
                    }
                )
            })
            .catch(error => {
                console.log(error);
            });
    }

    checkIfUserIsLogged() {
        let self = this;
        this.userController.checkIfUserIsLogged()
            .then(response => {
                self.setState(
                    {
                        isLogged: response.data
                    }
                )
            })
            .catch(error => {
                console.log(error);
            });
    }
}