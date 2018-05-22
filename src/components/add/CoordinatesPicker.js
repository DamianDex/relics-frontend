import React, {Component} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {Gmaps, Marker} from "react-gmaps";

const params = {v: '3.exp', key: 'AIzaSyCbRbS00bDAmgSC0zAwQPyAAX4DZMHd9aI'};

export default class CoordinatesPicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            coordinates: {
                latitude: '',
                longitude: ''
            }
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen}>
                <ModalHeader toggle={this.toggle}>{this.props.modalTitle}</ModalHeader>
                <ModalBody>
                    <Gmaps
                        width={'100%'}
                        height={'600px'}
                        lat='52'
                        lng='19'
                        zoom={6}
                        loadingMessage={'Be happy'}
                        params={params}
                        onMapCreated={this.onMapCreated}>
                        <Marker
                        lat={this.props.mLatitude}
                        lng={this.props.mLongitude}
                            draggable={true}
                            onDragEnd={this.props.onChangeValue}/>
                    </Gmaps>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.props.handlePickerClick}>{this.props.btnText}</Button>
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
