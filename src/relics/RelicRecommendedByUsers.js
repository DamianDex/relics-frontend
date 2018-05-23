import React from "react";
import {Button, Card, CardBody, CardGroup, CardHeader, Col, Collapse, Row} from "reactstrap";
import RelicSmallCard from "./RelicSmallCard";
import RelicController from "../controllers/RelicController";
import UserController from "../controllers/UserController";

export default class RelicRecommendedByUsers extends React.Component {
    constructor(props) {
        super(props);

        this.relicController = new RelicController();
        this.userController = new UserController();

        this.state = {
            IDs: []
        };

        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        this.getThreeByUserReviews();
        this.checkIfUserIsLogged();
    }

    toggle() {
        this.setState({collapse: !this.state.collapse});
    }

    render() {
        var cards;
        var header;

        var buttonText = "Pokaż";

        if (this.state.collapse) {
            buttonText = "Ukryj";
        } else {
            buttonText = "Pokaż";
        }

        if (!this.state.isLogged) {
            cards = (
                <CardGroup>
                    <p>Zaloguj się...</p>
                </CardGroup>
            )

            header = (
                <CardHeader>
                    <p>Rekomendowane ze względu na oceny - zaloguj się, aby otrzymać rekomendacje</p>
                    <Button color="primary" outline onClick={this.toggle}
                            style={{marginBottom: '1rem'}}>{buttonText}</Button>
                </CardHeader>
            )
        } else if (this.state.IDs.length != 0) {
            cards = (
                <CardGroup>
                    {
                        this.state.IDs.map(id => {
                                return <RelicSmallCard id={id}/>;
                            }
                        )
                    }
                </CardGroup>
            )

            header = (
                <CardHeader>
                    <p>Rekomendowane ze względu na oceny - wyszukano</p>
                    <Button color="primary" outline onClick={this.toggle}
                            style={{marginBottom: '1rem'}}>{buttonText}</Button>
                </CardHeader>
            )
        } else {
            cards = (
                <CardGroup>
                    <p>Proszę czekać trwa wyszukiwanie....</p>
                </CardGroup>
            )

            header = (
                <CardHeader>
                    <p>Rekomendowane ze względu na oceny - wyszukuje</p>
                    <Button color="primary" outline onClick={this.toggle}
                            style={{marginBottom: '1rem'}}>{buttonText}</Button>
                </CardHeader>
            )
        }

        return (
            <Col sm="12" md={{size: 10, offset: 1}}>
                <Card>
                    {header}
                    <Collapse isOpen={this.state.collapse}>
                        <CardBody>
                            <Row>
                                <Col>
                                    {cards}
                                </Col>
                            </Row>
                        </CardBody>
                    </Collapse>
                </Card>
            </Col>
        )

    }

    getThreeByUserReviews() {
        let self = this;
        this.relicController.recommendByUserReviews()
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

    checkIfUserIsLogged() {
        let self = this;
        this.userController.checkIfUserIsLogged()
            .then(response => {
                self.setState(
                    {
                        isLogged: response.data
                    }
                )
            })
            .catch(error => {
                console.log(error);
                self.setState({
                    isLogged: false
                })
            });
    }
}