import React, {Component} from "react";
import RelicController from "../../../../controllers/RelicController";
import {Card, CardBody, CardHeader, CardText, CardTitle} from "reactstrap";

export default class RelicDetails extends Component {
    constructor(props) {
        super(props);

        this.relicController = new RelicController();

        this.state = {
            modal: false,
            id: '',
            description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            identification: '',
            datingOfObject: '',
            registerNumber: '',
            href: ''
        };
    }

    componentDidMount() {
        this.getRelicDetails();
    }

    render() {
        return (
                <Card>
                    <CardHeader>Więcej informacji</CardHeader>
                    <CardBody>
                        <CardTitle>Special Title Treatment</CardTitle>
                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                        <h3>{this.state.identification}</h3>
                        <br/>
                        <h5>{this.state.registerNumber}</h5>
                        <h5>{this.state.datingOfObject}</h5>
                        <p>{this.state.description}</p>
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
                        registerNumber: 'Numer w rejestrze: '.concat(response.data.registerNumber),
                        datingOfObject: 'Datowany: '.concat(response.data.datingOfObject),
                        href: 'relic/'.concat(response.data.id),
                    }
                )
            })
            .catch(error => {
                console.log(error);
            })
    }
}


