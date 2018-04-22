import React, {Component} from "react";
import {Button, Card, CardBody, CardHeader, CardText} from "reactstrap";
import VoteController from "../../../../controllers/VoteController";
import ReviewCommentModal from "./ReviewCommentModal";
import ReviewCommentList from "./ReviewCommentList";

export default class SingleReviewComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isCommentModalOpen: false,
            isCommentListOpen: false
        }

        this.voteController = new VoteController();
        this.toogleCommentModal = this.toogleCommentModal.bind(this);
        this.toogleCommentList= this.toogleCommentList.bind(this);
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
                        <CardText>Ocena: {this.props.rating} / 10</CardText>
                        <p>Recenzja: {this.props.comment}</p>
                        <p>{this.showPositiveVotes(this.props.votes)} użytkowników lubi tą recenzję.</p>
                        <p>{this.showNegativeVotes(this.props.votes)} uzytkowników nie lubi tej recenzji.</p>
                        <Button color="success" outline onClick={() => this.positiveVote(this.props.id)}>Recenzja
                            przydatna!</Button>{' '}
                        <Button color="danger" outline onClick={() => this.negativeVote(this.props.id)}>Recenzja
                            słaba!</Button>{' '}
                        <Button color="primary" outline
                                onClick={this.toogleCommentModal}>Skomentuj!</Button>{' '}
                        <Button color="info" outline
                                onClick={this.toogleCommentList}>Pokaż komentarze!</Button>
                    </CardBody>
                </Card>
                <br/>

                <ReviewCommentList isOpen={this.state.isCommentListOpen}/>

                <ReviewCommentModal isOpen={this.state.isCommentModalOpen}
                                    handleCancel={this.toogleCommentModal}
                                    reviewId={this.props.id}/>
            </div>
        );
    }

    toogleCommentModal(e) {
        this.setState({
            isCommentModalOpen: !this.state.isCommentModalOpen
        })
    }

    toogleCommentList(e) {
        this.setState({
            isCommentListOpen: !this.state.isCommentListOpen
        })
    }

    showPositiveVotes(votes) {
        return votes.filter(vote => {
            return vote.isPositive
        }).length
    }

    showNegativeVotes(votes) {
        return votes.filter(vote => {
            return !vote.isPositive
        }).length
    }

    positiveVote(id) {
        this.voteController.postVote(id, true)
    }

    negativeVote(id) {
        this.voteController.postVote(id, false)
    }
}