import React from "react";
import {Button, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle} from "reactstrap";
import RelicController from "../controllers/RelicController";
import "./RelicSmallCard.css"
import ReviewController from "../controllers/ReviewController";
import CoordinatesPicker from "../components/add/CoordinatesPicker";

export default class RelicSmallCard extends React.Component {
    constructor(props) {
        super(props);

        this.relicController = new RelicController();
        this.reviewController = new ReviewController();

        this.state = {
            modal: false,
            id: '',
            identification: '',
            datingOfObject: '',
            registerNumber: '',
            href: '',
            imageSrc: '/images/icon.jpg'
        };

        this.toggle = this.toggle.bind(this);
        this.modalMapClick = this.modalMapClick.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    componentDidMount() {
        this.getRelicDetails();
        this.getAvgRating();
        this.getRatingCount();
        this.getRelicCoordinates();
    }

    render() {
        return (
            <Card>
                <CardImg top width="100%"
                         src={process.env.PUBLIC_URL + this.state.imageSrc}
                         alt="Card image cap"/>
                <CardBody>
                    <div style={{padding: "15px"}}>
                        <CardTitle>{this.state.identification}</CardTitle>
                        <br/>
                        <CardSubtitle>{this.state.registerNumber}</CardSubtitle>
                        <CardText>{this.state.datingOfObject}</CardText>
                        <CardText>Ocena: {this.state.avg} / 5</CardText>
                        <CardText>Ilość ocen: {this.state.count}</CardText>
                        <Button outline color="success" href={this.state.href}>Do profilu!</Button>{'  '}
                        <Button outline color="primary" onClick={this.modalMapClick}>Lokalizacja</Button>
                        <CoordinatesPicker coordinates={this.state.coordinates}
                                           onChangeValue={this.handleCoordinatesChange}
                                           isOpen={this.state.isMapOpen}
                                           handlePickerClick={this.modalMapClick}
                                           modalTitle="Lokalizacja zabytku"
                                           btnText="Zamknij"
                                           mLongitude={this.state.longitude}
                                           mLatitude={this.state.latitude}/>
                    </div>
                </CardBody>
            </Card>
        );
    }

    getRelicDetails() {
        let self = this;
        this.relicController.getRelicDetails(this.props.id)
            .then(response => {
                self.setState(
                    {
                        id: response.data.id,
                        identification: response.data.identification,
                        registerNumber: 'Numer w rejestrze: '.concat(response.data.registerNumber),
                        datingOfObject: 'Datowany: '.concat(response.data.datingOfObject),
                        href: 'relic/'.concat(response.data.id)
                    }
                )
            })
            .catch(error => {
                console.log(error);
            })
    }

    getRelicCoordinates() {
        let self = this;
        this.relicController.getGeographicLocation(this.props.id)
            .then(response => {
                self.setState(
                    {
                        longitude: response.data.longitude,
                        latitude: response.data.latitude
                    }
                )
            })
            .catch(error => {
                console.log(error);
            })
    }

    getAvgRating() {
        let self = this;
        this.reviewController.getAvgRating(this.props.id)
            .then(response => {
                self.setState(
                    {
                        avg: response.data
                    }
                )
            })
            .catch(error => {
                console.log(error);
            })
    }

    getRatingCount() {
        let self = this;
        this.reviewController.getRatingCount(this.props.id)
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

    modalMapClick(e) {
        this.setState({
            isMapOpen: !this.state.isMapOpen
        })
    }
}