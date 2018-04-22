import React, {Component} from "react";
import {Button, Input, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import ReviewCommentController from "../../../../controllers/ReviewCommentController";

export default class ReviewCommentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: '',
        }

        this.reviewCommentController = new ReviewCommentController();

        this.handleAccept = this.handleAccept.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen}>
                <ModalHeader>Twój komentarz</ModalHeader>
                <ModalBody>
                    <Input type="textarea" name="comment"
                           id="comment"
                           placeholder = "Miejsce na Twój komentarz"
                           value={this.state.comment}
                           onChange={this.handleCommentChange}/>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" outline onClick={this.handleAccept}>Skomentuj</Button>{' '}
                    <Button color="secondary" outline onClick={this.props.handleCancel}>Odrzuć</Button>
                </ModalFooter>
            </Modal>
        );
    }

    handleCommentChange(e) {
        this.setState({
            comment: e.target.value
        })
    }

    handleAccept(e) {
        this.reviewCommentController.postReviewComment(this.props.reviewId, this.state.comment);
        {this.props.handleCancel(e.target.value)}
    }
}