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
            rankingSize: 1,
            IDs: [],
            categoryFilter: '',
            voivodeshipFilter: ''
        };

        this.handleCategoryFilterChange = this.handleCategoryFilterChange.bind(this);
        this.handleVoivodeshipFilterChange = this.handleVoivodeshipFilterChange.bind(this);
        this.getTopRankedRelicIDsWithFilter = this.getTopRankedRelicIDsWithFilter.bind(this);

        this.removeFilter = this.removeFilter.bind(this);

        this.handleMore = this.handleMore.bind(this);
        this.handleLess = this.handleLess.bind(this);
    }

    componentDidMount() {
        this.getTopRankedRelicIDsWithFilter(this.state.rankingSize, this.state.categoryFilter, this.state.voivodeshipFilter);
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
                            <div className="filter-component">
                                <Form inline >
                                    <Col sm={6}>
                                    <CategoryFilterDropdown value={this.state.categoryFilter}
                                                            onChangeValue={this.handleCategoryFilterChange}/>
                                    </Col>
                                    <Col sm={6}>
                                    <VoivodeshipFilterDropdown value={this.state.voivodeshipFilter}
                                                               onChangeValue={this.handleVoivodeshipFilterChange}/>
                                    </Col>
                                </Form>
                                <br/>
                                <Button outline color="success"
                                        onClick={() => this.getTopRankedRelicIDsWithFilter(this.state.rankingSize, this.state.categoryFilter, this.state.voivodeshipFilter)}>Filtruj
                                    wyniki</Button>{'   '}
                                <Button outline color="primary"
                                        onClick={this.removeFilter}>Wyczyść
                                    filtr</Button>
                            </div>
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
                <br/>
                <Col sm="12" md={{size: 10, offset: 1}}>
                    <Button block outline color="success" onClick={this.handleMore}>Załaduj więcej (+2)
                        / {this.state.rankingSize}</Button>
                    <Button block outline color="primary" onClick={this.handleLess}>Zwiń listę (-2)
                        / {this.state.rankingSize}</Button>
                </Col>
            </div>
        );
    }

    handleMore() {
        let newQuantity = this.state.rankingSize + 2;
        this.getTopRankedRelicIDsWithFilter(newQuantity, this.state.categoryFilter, this.state.voivodeshipFilter)
        this.setState(
            {
                rankingSize: newQuantity,
            }
        )
    }

    handleLess() {
        let newQuantity = this.state.rankingSize - 2;
        this.getTopRankedRelicIDsWithFilter(newQuantity, this.state.categoryFilter, this.state.voivodeshipFilter)
        this.setState(
            {
                rankingSize: newQuantity,
            }
        )
    }

    removeFilter() {
        this.getTopRankedRelicIDsWithFilter(this.state.rankingSize, '', '');
        this.setState(
            {
                categoryFilter: '',
                voivodeshipFilter: ''
            }
        )
    }

    getTopRankedRelicIDsWithFilter(size, category, voivodeship) {
        let self = this;
        this.reviewController.getTopRankedRelicIDsWithFilter(size, category, voivodeship)
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