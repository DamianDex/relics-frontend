import React, {Component} from "react";
import RelicController from "../../controllers/RelicController";
import {Button, Col, Container, Row} from "reactstrap";
import GeographyController from "../../controllers/GeographyController";
import ReviewController from "../../controllers/ReviewController";
import CoordinatesPicker from "../add/CoordinatesPicker";

export default class AdminRelicListItem extends Component {
    constructor(props) {
        super(props);

        this.props.relic = {
            imageSrc: '/images/icon.jpg',
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
                            <img src={process.env.PUBLIC_URL + this.props.relic.imageSrc}/>
                        </Col>
                        <Col xs="3">
                            <b>Nazwa miejsca:</b> {this.props.relic.identification} <br/>
                            <b>Kategoria:</b> {this.props.relic.categoryName} <br/>
                            <b>Rejestr:</b> {this.props.relic.registerNumber} <br/>
                            <b>Datowany:</b> {this.props.relic.datingOfObject} <br/>
                        </Col>
                        <Col xs="3">
                            <b>Województwo:</b> {this.props.relic.voivodeshipName} <br/>
                            <b>Powiat:</b> {this.props.relic.districtName} <br/>
                            <b>Gmina:</b> {this.props.relic.communeName} <br/>
                            <b>Miejscowość:</b> {this.props.relic.placeName} <br/>
                            <b>Ulica:</b> {this.props.relic.street} <br/>
                        </Col>
                        <Col xs="auto">
                            <b>Ocena użytkowników:</b> {this.props.relic.avg} / 5.0 <br/>
                            <b>Liczba głosów:</b> {this.props.relic.count} <br/>
                            <b>Twoja ocena: </b> {this.props.relic.ratingToSet} <br/>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col xs="4">
                            <Button outline color="success" href={this.props.relic.href}>Do profilu!</Button>{'   '}
                            <Button outline color="primary" onClick={this.modalMapClick}>Lokalizacja</Button>
                            <CoordinatesPicker coordinates={this.props.relic.coordinates}
                                               onChangeValue={this.handleCoordinatesChange}
                                               isOpen={this.props.relic.isMapOpen}
                                               handlePickerClick={this.modalMapClick}
                                               modalTitle="Lokalizacja zabytku"
                                               btnText="Zamknij"
                                               mLongitude={this.props.relic.longitude}
                                               mLatitude={this.props.relic.latitude}/>
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
                        categoryName: response.data.categories[0].categoryName
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
            isMapOpen: !this.props.relic.isMapOpen
        })
    }

    getMyRating() {
        let self = this;

        this.reviewController.getMyRating(this.props.relicId)
            .then(response => {

                if (response.data != "") {
                    self.setState(
                        {
                            ratingToSet: response.data
                        }
                    )
                } else {
                    self.setState(
                        {
                            ratingToSet: "--"
                        }
                    )
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
}


