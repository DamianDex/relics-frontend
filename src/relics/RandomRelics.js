import React from "react";
import {Card, CardBody, CardGroup, CardHeader, Col, Row} from "reactstrap";
import RelicSmallCard from "./RelicSmallCard";
import RelicController from "../controllers/RelicController";

export default class RandomRelics extends React.Component {
    constructor(props) {
        super(props);

        this.relicController = new RelicController();

        this.state = {
            IDs: []
        };
    }

    componentDidMount() {
        this.getRandomRelicIDs();
    }

    render() {


        return (
            <Col sm="12" md={{size: 10, offset: 1}}>
                <Card>
                    <CardHeader>
                        <p>Losowo wybrane</p>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col>
                                <CardGroup>
                                    {
                                        this.state.IDs.map(id => {
                                                return <RelicSmallCard id={id}/>;
                                            }
                                        )
                                    }
                                </CardGroup>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        )

    }

    getRandomRelicIDs() {
        let self = this;
        this.relicController.getRandomRelicIds(3)
            .then(response => {
                self.setState(
                    {
                        IDs: response.data
                    }
                )
            })
            .catch(error => {
                console.log(error);
            })
    }
}