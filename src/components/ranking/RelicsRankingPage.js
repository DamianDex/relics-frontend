import React, {Component} from "react";
import ReviewController from "../../controllers/ReviewController";
import {Button, Card, CardBody, CardHeader, Col, Form, ListGroup} from "reactstrap";

import './RelicsRankingPage.css'
import CategoryFilterDropdown from "./filter/CategoryFilterDropdown";
import VoivodeshipFilterDropdown from "./filter/VoivodeshipFilterDropdown";
import RankingListItem from "./RankingListItem";

export default class RelicsRankingPage extends Component {
    constructor(props) {
        super(props);
        this.reviewController = new ReviewController();

        this.state = {
            IDs: [],
            categoryFilter: '',
            voivodeshipFilter: ''
        };

        this.handleCategoryFilterChange = this.handleCategoryFilterChange.bind(this);
        this.handleVoivodeshipFilterChange = this.handleVoivodeshipFilterChange.bind(this);
        this.getTopRankedRelicIDsWithFilter = this.getTopRankedRelicIDsWithFilter.bind(this);
        this.getTopRankedRelicIDs = this.getTopRankedRelicIDs.bind(this);
    }

    componentDidMount() {
        this.getTopRankedRelicIDs();
    }

    handleCategoryFilterChange(e) {
        this.setState({categoryFilter: e.target.value})
    }

    handleVoivodeshipFilterChange(e) {
        this.setState({voivodeshipFilter: e.target.value})
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
                                <CategoryFilterDropdown value={this.state.categoryFilter}
                                                        onChangeValue={this.handleCategoryFilterChange}/>
                                <VoivodeshipFilterDropdown value={this.state.voivodeshipFilter}
                                                           onChangeValue={this.handleVoivodeshipFilterChange}/>
                                <Button color="success" onClick={this.getTopRankedRelicIDsWithFilter}>Filtruj wyniki</Button>
                                <Button color="primary" onClick={this.getTopRankedRelicIDs}>Wyczyść filtr</Button>
                            </Form>
                            <p>Obecny filtr to: {this.state.categoryFilter} + {this.state.voivodeshipFilter}</p>
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
                                                <RankingListItem id={id}/>
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

    getTopRankedRelicIDsWithFilter() {
        let self = this;
        this.reviewController.getTopRankedRelicIDsWithFilter(5, 'TODO', 'TODO')
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


