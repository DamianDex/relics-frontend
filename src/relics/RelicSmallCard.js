import React from "react";
import {
    Button,
    Card,
    CardBody,
    CardImg,
    CardSubtitle,
    CardText,
    CardTitle,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from "reactstrap";
import RelicController from "../controllers/RelicController";

export default class RelicSmallCard extends React.Component {
    constructor(props) {
        super(props);

        this.relicController = new RelicController();

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
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    componentDidMount() {
        this.getRelicDetails();
    }

    render() {
        return (
            <Card>
                <CardImg top width="100%"
                         src={process.env.PUBLIC_URL + this.state.imageSrc}
                         alt="Card image cap"/>
                <CardBody>
                    <CardTitle>{this.state.identification}</CardTitle>
                    <CardSubtitle>{this.state.registerNumber}</CardSubtitle>
                    <CardText>{this.state.datingOfObject}</CardText>
                    <Button outline color="success" href={this.state.href}>Do profilu!</Button>
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
}