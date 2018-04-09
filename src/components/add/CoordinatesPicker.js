import React, {Component} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {Gmaps, Marker} from "react-gmaps";

const params = {v: '3.exp', key: 'AIzaSyCbRbS00bDAmgSC0zAwQPyAAX4DZMHd9aI'};

export default class CoordinatesPicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            coordinates: {
                latitude: '52',
                longitude: '21'
            }
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen}>
                <ModalHeader toggle={this.toggle}>Wskaż zabytek na mapie</ModalHeader>
                <ModalBody>
                    <Gmaps
                        width={'100%'}
                        height={'600px'}
                        lat={this.props.coordinates.latitude}
                        lng={this.props.coordinates.longitude}
                        zoom={12}
                        loadingMessage={'Be happy'}
                        params={params}
                        onMapCreated={this.onMapCreated}>
                        <Marker
                            lat={this.props.coordinates.latitude}
                            lng={this.props.coordinates.longitude}
                            draggable={true}
                            onDragEnd={this.props.onChangeValue}/>
                    </Gmaps>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.props.handlePickerClick}>Zapisz współrzędne</Button>
                </ModalFooter>
            </Modal>
        );
    }

    onMapCreated(map) {
        map.setOptions({
            disableDefaultUI: true
        });
    }

    onCloseClick() {
        console.log('onCloseClick');
    }

    onClick(e) {
        console.log('onClick', e);
    }
}
