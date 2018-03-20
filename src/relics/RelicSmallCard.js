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
            href: ''
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
                         src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
                         alt="Card image cap"/>
                <CardBody>
                    <CardTitle>{this.state.identification}</CardTitle>
                    <CardSubtitle>{this.state.registerNumber}</CardSubtitle>
                    <CardText>{this.state.datingOfObject}</CardText>
                    <Button color="primary" onClick={this.toggle}>Dowiedz się więcej!</Button>
                    <Button color="success" href={this.state.href}>Do profilu!</Button>

                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                        <ModalBody>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                            incididunt
                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                            ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                            in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
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