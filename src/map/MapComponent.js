import React from 'react';
import {Circle, Gmaps, InfoWindow, Marker} from 'react-gmaps';
import RelicController from "../controllers/RelicController";
import {Card, CardBody, CardHeader} from "reactstrap";

const params = {v: '3.exp', key: 'AIzaSyCbRbS00bDAmgSC0zAwQPyAAX4DZMHd9aI'};

export default class MapComponent extends React.Component {

    constructor(props) {
        super(props);

        this.relicController = new RelicController();

        this.state = {
            latitude: '',
            longitude: ''
        };
    }

    onMapCreated(map) {
        map.setOptions({
            disableDefaultUI: true
        });
    }

    onDragEnd(e) {
        console.log('onDragEnd', e);
    }

    onCloseClick() {
        console.log('onCloseClick');
    }

    onClick(e) {
        console.log('onClick', e);
    }

    componentDidMount() {
        this.getRelicDetails();
    }

    render() {
        return (
            <Card>
                <CardHeader>Zobacz lokalizację</CardHeader>
                <CardBody>
                    <Gmaps
                        width={'100%'}
                        height={'600px'}
                        lat={this.state.latitude}
                        lng={this.state.longitude}
                        zoom={12}
                        loadingMessage={'Be happy'}
                        params={params}
                        onMapCreated={this.onMapCreated}>
                        <Marker
                            lat={this.state.latitude}
                            lng={this.state.longitude}
                            draggable={true}
                            onDragEnd={this.onDragEnd}/>
                        <InfoWindow
                            lat={this.state.latitude}
                            lng={this.state.longitude}
                            content={'Hello, React :)'}
                            onCloseClick={this.onCloseClick}/>
                        <Circle
                            lat={this.state.latitude}
                            lng={this.state.longitude}
                            radius={500}
                            onClick={this.onClick}/>
                    </Gmaps>
                </CardBody>
            </Card>
        );
    }

    getRelicDetails() {
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
};