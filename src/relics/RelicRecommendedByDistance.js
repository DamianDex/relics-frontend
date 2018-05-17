import React from "react";
import {Button, Card, CardBody, CardGroup, CardHeader, Col, Collapse, Row} from "reactstrap";
import RelicSmallCard from "./RelicSmallCard";
import RelicController from "../controllers/RelicController";

export default class RelicRecommendedByDistance extends React.Component {
    constructor(props) {
        super(props);

        this.relicController = new RelicController();

        this.state = {
            IDs: []
        };

        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        this.getThreeCloseToMeRandomRelics(this.props.latitude, this.props.longitude, this.props.maximum);

        navigator.geolocation.watchPosition((position) => {

            this.setState(
                {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                }
            )
        });
    }

    toggle() {
        this.setState({collapse: !this.state.collapse});
    }

    render() {

        var cards;
        var header;

        if (this.state.IDs.length != 0) {
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
                    <p>Rekomendowane ze względu na odległość - wyszukano</p>
                    <Button color="primary" onClick={this.toggle} style={{marginBottom: '1rem'}}>Pokaż</Button>
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
                    <p>Rekomendowane ze względu na odległość - wyszukuje</p>
                    <Button color="primary" onClick={this.toggle} style={{marginBottom: '1rem'}}>Pokaż</Button>
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

    getThreeCloseToMeRandomRelics(latitude, longitude, maximum) {
        let self = this;
        this.relicController.getRandomRelicIDsByDistance(4, latitude, longitude, 10)
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