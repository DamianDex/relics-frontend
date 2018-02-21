import React from "react";
import {Button, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Collapse} from "reactstrap";
import Image from "../images/images.jpg";

class RelicCard extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {collapse: false};
    }

    toggle() {
        this.setState({collapse: !this.state.collapse});
    }

    render() {
        return (
            <Card>
                <CardImg top width="100%" src={Image} alt="Card image cap"/>
                <CardBody>
                    <CardTitle>{this.props.name}</CardTitle>
                    <CardSubtitle>{this.props.categories}</CardSubtitle>
                    <CardText>{this.props.description}</CardText>
                    <Button color="primary" onClick={this.toggle} style={{marginBottom: '1rem'}}>Dowiedz się więcej !</Button>
                    <Collapse isOpen={this.state.collapse}>
                        <Card>
                            <CardBody>
                                Anim pariatur cliche reprehenderit,
                                enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                anim keffiyeh helvetica, craft beer labore wes anderson cred
                                nesciunt sapiente ea proident.
                            </CardBody>
                        </Card>
                    </Collapse>
                </CardBody>
            </Card>
        );
    }
}

export default RelicCard;