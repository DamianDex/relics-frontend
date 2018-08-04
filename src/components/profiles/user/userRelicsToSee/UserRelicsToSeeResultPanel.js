import React, {Component} from "react";
import {Card, CardBody, CardHeader, ListGroup} from "reactstrap";
import UserRelicsToSeeListItem from "./UserRelicsToSeeListItem";
import RelicsToSeeController from "../../../../controllers/RelicsToSeeController";

export default class UserReviewsResultPanel extends Component {

    constructor(props) {
        super(props);

        this.relicsToSeeController = new RelicsToSeeController();

        this.state = {
            IDs: [],
        }
    }

    componentDidMount() {
        this.getRelicsToSeeByUser(this.props.category,this.props.place);
    }

    componentWillReceiveProps(nextProps) {
        this.getRelicsToSeeByUser(nextProps.category, nextProps.place);
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
                                        <UserRelicsToSeeListItem id={id}/>
                                    );
                                }
                            )
                        }
                    </ListGroup>
                </CardBody>
            </Card>
        );
    }

    getRelicsToSeeByUser(category, place) {
        this.setState(
            {
                IDs: []
            }
        )

        let self = this;
        this.relicsToSeeController.getRelicsToSeeByUser(category, place)
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
