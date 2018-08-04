import React, {Component} from "react";
import {Card, CardBody, CardHeader, ListGroup} from "reactstrap";
import UserRelicListItem from "./UserRelicListItem";
import RelicController from "../../../../controllers/RelicController";

export default class UserReviewsResultPanel extends Component {


    constructor(props) {
        super(props);

        this.relicController = new RelicController();

        this.state = {
            IDs: [],
        }
    }

    componentDidMount() {
        this.getRelicsReviewdByUser(this.props.vote,this.props.category);
    }

    componentWillReceiveProps(nextProps) {
        this.getRelicsReviewdByUser(nextProps.vote,nextProps.category);
    }

    render() {
        return (
            <Card>
                <CardHeader align="center">Wyniki wyszukiwania</CardHeader>
                <CardBody>
                    <ListGroup>
                        {
                            this.state.IDs.map(id => {
                                    return (
                                        <UserRelicListItem id={id}/>
                                    );
                                }
                            )
                        }
                    </ListGroup>
                </CardBody>
            </Card>
        );
    }

    getRelicsReviewdByUser(vote,category) {
        this.setState(
            {
                IDs: []
            }
        )

        let self = this;
        this.relicController.getRelicsReviewdByUser(vote,category)
            .then(response => {
                self.setState(
                    {
                        IDs: response.data
                    }
                )
            })
            .catch(error => {
                console.log(error);
            })
    }
}
