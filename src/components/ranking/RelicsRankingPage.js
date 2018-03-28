import React, {Component} from "react";
import ReviewController from "../../controllers/ReviewController";
import RelicRankingCard from "./RelicRankingCard";
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText
} from "reactstrap";

import './RelicsRankingPage.css'

export default class RelicsRankingPage extends Component {
    constructor(props) {
        super(props);
        this.reviewController = new ReviewController();

        this.state = {
            IDs: []
        };

    }

    componentDidMount() {
        this.getTopRankedRelicIDs();
    }

    render() {
        return (
            <div>
                <br/>
                <Col sm="12" md={{size: 10, offset: 1}}>
                    <Card>
                        <CardHeader>Filtruj ranking</CardHeader>
                        <CardBody>
                            <Form inline>
                                <div class="category-filter">
                                    <FormGroup>
                                        <Label for="exampleSelect1">Kategoria</Label>
                                        <Input type="select" name="select" id="exampleSelect1">
                                            <option></option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Input>
                                    </FormGroup>
                                </div>

                                <FormGroup class="voivodeship-filter">
                                    <Label for="exampleSelect">Województwo</Label>
                                    <Input type="select" name="select" id="exampleSelect">
                                        <option></option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Input>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
                <br/>
                <Col sm="12" md={{size: 10, offset: 1}}>
                    <Card>
                        <CardHeader>Najwyżej oceniane</CardHeader>
                        <CardBody>
                            <ListGroup>
                                {
                                    this.state.IDs.map(id => {
                                            return (
                                                <ListGroupItem>
                                                    <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
                                                    <ListGroupItemText>
                                                        <RelicRankingCard relicId={id}/>
                                                    </ListGroupItemText>
                                                </ListGroupItem>
                                            );
                                        }
                                    )
                                }
                            </ListGroup>
                        </CardBody>
                    </Card>
                </Col>
            </div>


        );
    }

    getTopRankedRelicIDs() {
        let self = this;
        this.reviewController.getTopRankedRelicIDs(5)
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


