import React, {Component} from "react";
import RelicController from "../../controllers/RelicController";
import {Button, Col, Container, Row} from "reactstrap";
import GeographyController from "../../controllers/GeographyController";
import ReviewController from "../../controllers/ReviewController";

export default class RelicRankingCard extends Component {
    constructor(props) {
        super(props);
        this.relicController = new RelicController();
        this.geographyController = new GeographyController();
        this.reviewController = new ReviewController();

        this.state = {
            id: '',
            identification: '',
            imageSrc: '/images/icon.jpg'
        }
    }

    componentDidMount() {
        this.getRelicDetails();
        this.getRelicGeography();
        this.getAvgRating();
        this.getRatingCount();
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col xs="3">
                            <img src={process.env.PUBLIC_URL + this.state.imageSrc}/>
                        </Col>
                        <Col xs="3">
                            <b>Nazwa miejsca:</b> {this.state.identification} <br/>
                            <b>Rejestr:</b> {this.state.registerNumber} <br/>
                            <b>Datowany:</b> {this.state.datingOfObject} <br/>
                        </Col>
                        <Col xs="3">
                            <b>Województwo:</b> {this.state.voivodeshipName} <br/>
                            <b>Dzielnica:</b> {this.state.districtName} <br/>
                            <b>Gmina:</b> {this.state.communeName} <br/>
                            <b>Miejsce:</b> {this.state.placeName} <br/>
                            <b>Ulica:</b> {this.state.street} <br/>
                        </Col>
                        <Col xs="auto">
                            <b>Ocena użytkowników:</b> {this.state.avg} / 5.0 <br/>
                            <b>Liczba głosów:</b> {this.state.count} <br/>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col xs="4">
                            <Button outline color="success" href={this.state.href}>Do profilu!</Button>{'   '}
                            <Button outline color="primary" href={this.state.href}>Szybki podgląd!</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    getRelicDetails() {
        let self = this;
        this.relicController.getRelicDetails(this.props.relicId)
            .then(response => {
                console.log(response);
                self.setState(
                    {
                        identification: response.data.identification,
                        registerNumber: response.data.registerNumber,
                        datingOfObject: response.data.datingOfObject,
                        href: 'relic/'.concat(response.data.id),
                    }
                )
            })
            .catch(error => {
                console.log(error);
            })
    }

    getRelicGeography() {
        let self = this;
        this.geographyController.getRelicGeography(this.props.relicId)
            .then(response => {
                self.setState(
                    {
                        longitude: response.data.longitude,
                        latitude: response.data.latitude,
                        voivodeshipName: response.data.voivodeshipName,
                        districtName: response.data.districtName,
                        communeName: response.data.communeName,
                        placeName: response.data.placeName,
                        street: response.data.street
                    }
                )
            })
            .catch(error => {
                console.log(error);
            })
    }

    getAvgRating() {
        let self = this;
        this.reviewController.getAvgRating(this.props.relicId)
            .then(response => {
                self.setState(
                    {
                        avg: Number((response.data).toFixed(1))
                    }
                )
            })
            .catch(error => {
                console.log(error);
            })
    }

    getRatingCount() {
        let self = this;
        this.reviewController.getRatingCount(this.props.relicId)
            .then(response => {
                self.setState(
                    {
                        count: response.data
                    }
                )
            })
            .catch(error => {
                console.log(error);
            })
    }
}


