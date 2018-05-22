import React, {Component} from "react";
import {Card, CardBody, CardHeader, Collapse} from "reactstrap";
import ReviewCommentController from "../../../../controllers/ReviewCommentController";

export default class ReviewCommentList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: []
        }

        this.reviewCommentController = new ReviewCommentController();
    }

    componentDidMount() {
        this.getComments(this.props.reviewId);
    }

    render() {
        return (
            <div style={{paddingLeft: '5em'}}>
                <Collapse isOpen={this.props.isOpen}>
                    {
                        this.state.comments.map(comment => {
                            return (
                                <div>
                                    <Card>
                                        <CardHeader>
                                            <p>{comment.appUser.username}</p>
                                            <p>{comment.creationDate}</p>
                                        </CardHeader>
                                        <CardBody>
                                            <div style={{padding: "15px"}}>
                                                <p>{comment.comment}</p>
                                            </div>
                                        </CardBody>
                                    </Card>
                                    <br/>
                                </div>
                            )
                        })
                    }
                </Collapse>
            </div>
        );
    }

    getComments(id) {
        let self = this;
        this.reviewCommentController.getComments(id)
            .then(response => {
                console.log(response);
                self.setState(
                    {
                        comments: response.data
                    }
                )
            })
            .catch(error => {
                console.log(error);
            })
    }
}