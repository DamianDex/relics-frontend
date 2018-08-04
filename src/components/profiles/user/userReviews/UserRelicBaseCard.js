import React, {Component} from "react";
import RelicController from "../../../../controllers/RelicController";
import {Button, Col, Container, Row} from "reactstrap";
import GeographyController from "../../../../controllers/GeographyController";
import ReviewController from "../../../../controllers/ReviewController";
import CoordinatesPicker from "../../../add/CoordinatesPicker";

export default class UserRelicBaseCard extends Component {
    constructor(props) {
        super(props);
        this.relicController = new RelicController();
        this.geographyController = new GeographyController();
        this.reviewController = new ReviewController();

        this.state = {
            id: '',
            identification: '',
            imageSrc: '/images/icon.jpg',
            vote: ''
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
                <Row>
                        <Col sm="3" md={{size: 3}}>
                            <img src={process.env.PUBLIC_URL + this.state.imageSrc}/>
                        </Col>
                        <Col sm="9" md={{size: 6, offset: 3}}>
                            <b>Nazwa miejsca:</b> {this.state.identification} <br/>
                            <b>Rejestr:</b> {this.state.registerNumber} <br/>
                            <b>Miejscowość:</b> {this.state.placeName} <br/>
                            <b>Kategoria:</b> {this.state.categoryName} <br/>
                            <b>Ocena użytkowników:</b> {this.state.avg} / 5.0 <br/>
                            <b>Liczba głosów:</b> {this.state.count} <br/>
                            <b>Twoja ocena:</b> {this.state.vote}<br/>
                        </Col>
                        <Col sm="12">
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
                        placeName: response.data.placeName,
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

    getMyRating() {
        let self = this;

        this.reviewController.getMyRating(this.props.relicId)
            .then(response => {

                if (response.data != "") {
                    self.setState(
                        {
                            vote: response.data
                        }
                    )
                } else {
                    self.setState(
                        {
                            vote: "--"
                        }
                    )
                }
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
}
