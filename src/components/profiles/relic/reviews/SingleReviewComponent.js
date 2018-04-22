import React, {Component} from "react";
import {Button} from "reactstrap";

export default class SingleReviewComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Card>
                    <CardHeader>
                        <p>{this.props.username}</p>
                        <p>{this.props.creationDate}</p>
                    </CardHeader>
                    <CardBody>
                        <CardText>Ocena: {review.rating} / 10</CardText>
                        <p>Recenzja: {review.comment}</p>
                        <p>{this.showPositiveVotes(review.votes)} użytkowników lubi tą recenzję.</p>
                        <p>{this.showNegativeVotes(review.votes)} uzytkowników nie lubi tej recenzji.</p>
                        <Button color="success" outline onClick={() => this.positiveVote(this.props.id)}>Recenzja
                            przydatna!</Button>{' '}
                        <Button color="danger" outline onClick={() => this.negativeVote(this.props.id)}>Recenzja
                            słaba!</Button>{' '}
                        <Button color="primary" outline
                                onClick={() => this.handleReviewCommentClick(this.props.id)}>Skomentuj!</Button>{' '}
                        <Button color="info" outline onClick={() => this.handleReviewCommentClick(this.props.id)}>Pokaż
                            komentarze!</Button>
                    </CardBody>
                </Card>
                <br/>
            </div>
        );
    }
}