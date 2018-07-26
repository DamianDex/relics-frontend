import React, {Component} from "react";
import RelicController from "../../controllers/RelicController";
import {Button, Col, Container, Row} from "reactstrap";
import GeographyController from "../../controllers/GeographyController";
import ReviewController from "../../controllers/ReviewController";
import CoordinatesPicker from "../add/CoordinatesPicker";

export default class RelicRankingCard extends Component {
    constructor(props) {
        super(props);
        this.relicController = new RelicController();
        this.geographyController = new GeographyController();
        this.reviewController = new ReviewController();

        this.state = {
            id: '',
            identification: '',
            imageSrc: '/images/icon.jpg',
            myRating: ''
        }

        this.modalMapClick = this.modalMapClick.bind(this);
    }

    componentDidMount() {
        this.getRelicDetails();
        this.getRelicGeography();
        this.getAvgRating();
        this.getRatingCount();
        this.getMyRating();
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col xs="3">
                            <img src={process.env.PUBLIC_URL + this.state.imageSrc}/>
                        </Col>
                        <Col xs="2">
                            <b>Nazwa miejsca:</b> {this.state.identification} <br/>
                            <b>Rejestr:</b> {this.state.registerNumber} <br/>
                            <b>Województwo:</b> {this.state.voivodeshipName} <br/>
                            <b>Miejscowość:</b> {this.state.placeName} <br/>
                        </Col>
                        <Col xs="2">
                            <b>Ocena użytkowników:</b> {this.state.avg} / 5.0 <br/>
                            <b>Liczba głosów:</b> {this.state.count} <br/>
                            <b>Twoja ocena: </b> {this.state.myRating} <br/>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col xs="4">
                            <Button outline color="success" href={this.state.href}>Do profilu!</Button>{'   '}
                            <Button outline color="primary" onClick={this.modalMapClick}>Lokalizacja</Button>
                            <CoordinatesPicker coordinates={this.state.coordinates}
                                               onChangeValue={this.handleCoordinatesChange}
                                               isOpen={this.state.isMapOpen}
                                               handlePickerClick={this.modalMapClick}
                                               modalTitle="Lokalizacja zabytku"
                                               btnText="Zamknij"
                                               mLongitude={this.state.longitude}
                                               mLatitude={this.state.latitude}/>
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

    modalMapClick() {
        this.setState({
            isMapOpen: !this.state.isMapOpen
        })
    }

    getMyRating() {
        let self = this;

        var ratingToSet = "Nie jesteś zalogowany";

        this.reviewController.getMyRating(this.props.relicId)
            .then(response => {

                if (response.data != "") {
                    ratingToSet = response.data;
                } else {
                    ratingToSet = "--";
                }
            })
            .catch(error => {
                console.log(error);
            })


        this.setState({
            myRating: ratingToSet
        });
    }
}
