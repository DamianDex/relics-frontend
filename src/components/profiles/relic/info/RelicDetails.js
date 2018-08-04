import React, {Component} from "react";
import RelicController from "../../../../controllers/RelicController";
import {Card, CardBody, CardHeader} from "reactstrap";
import GeographyController from "../../../../controllers/GeographyController";
import "./RelicDetails.css"

export default class RelicDetails extends Component {
    constructor(props) {
        super(props);

        this.relicController = new RelicController();
        this.geographyController = new GeographyController();

        this.state = {};
    }

    componentDidMount() {
        this.getRelicDetails();
        this.getRelicGeography();
    }

    render() {
        return (
            <Card>
                <CardHeader>Informacje</CardHeader>
                <CardBody>
                    <div class="details-body">
                        <h2>Dane ogólne</h2>
                        <b>Nazwa miejsca:</b> {this.state.identification} <br/>
                        <b>Opis:</b> {this.state.description} <br/>
                        <b>Kategoria:</b> {this.state.categoryName} <br/>
                        <b>Rejestr:</b> {this.state.registerNumber} <br/>
                        <b>Datowany:</b> {this.state.datingOfObject} <br/>

                        <br/>

                        <h2>Dane geograficzne</h2>
                        <b>Szerokość geograficzna:</b> {this.state.latitude} <br/>
                        <b>Długość geograficzna:</b> {this.state.longitude} <br/>
                        <b>Województwo:</b> {this.state.voivodeshipName} <br/>
                        <b>Powiat:</b> {this.state.districtName} <br/>
                        <b>Gmina:</b> {this.state.communeName} <br/>
                        <b>Miejscowość:</b> {this.state.placeName} <br/>
                        <b>Ulica:</b> {this.state.street} <br/>
                    </div>
                </CardBody>
            </Card>
        );
    }

    getRelicDetails() {
        let self = this;
        this.relicController.getRelicDetails(this.props.id)
            .then(response => {
                console.log(response.data.description);
                self.setState(
                    {
                        id: response.data.id,
                        identification: response.data.identification,
                        description: response.data.description,
                        registerNumber: response.data.registerNumber,
                        datingOfObject: response.data.datingOfObject,
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
        this.geographyController.getRelicGeography(this.props.id)
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
}


