import React, {Component} from "react";
import {Card, CardBody, CardHeader, CardText} from "reactstrap";
import ReviewController from "../../../../controllers/ReviewController";

export default class ReviewComponent extends Component {
    constructor(props) {
        super(props);

        this.reviewController = new ReviewController();

        this.state = {
            reviews: []
        }

    }

    componentDidMount() {
        this.getRelicReviews();
    }

    render() {
        return (
            <div>
                {this.state.reviews.map((item, index) => (
                    <Card>
                        <CardHeader>Nazwa użytkownika</CardHeader>
                        <CardBody>
                            <CardText>{index}</CardText>
                            <p>{item.comment}</p>
                            <p>{item.rating}</p>
                            <CardText>Treść recenzji + ocena.</CardText>
                        </CardBody>
                    </Card>
                ))}
            </div>
        );
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
                console.log(self.state.reviews);
            })
            .catch(error => {
                console.log(error);
            })
    }

}