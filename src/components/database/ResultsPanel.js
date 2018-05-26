import React, {Component} from "react";
import {Card, CardBody, CardHeader, ListGroup} from "reactstrap";
import RankingListItem from "../ranking/RankingListItem";
import RelicController from "../../controllers/RelicController";

export default class ResultsPanel extends Component {


    constructor(props) {
        super(props);

        this.relicController = new RelicController();

        this.state = {
            IDs: [],
            name: '',
            register: '',
            voivodeship: '',
            category: ''
        }
    }

    componentDidMount() {
        this.getDatabaseItemsWithFilter(this.state.name, this.state.register, this.state.voivodeship, this.state.category);
    }


    render() {
        return (
            <Card>
                <CardHeader align="center">Wyniki wyszukiwania</CardHeader>
                <CardBody>
                    <ListGroup>
                        {
                            this.state.IDs.map(id => {
                                    return (
                                        <RankingListItem id={id}/>
                                    );
                                }
                            )
                        }
                    </ListGroup>
                </CardBody>
            </Card>
        );
    }

    getDatabaseItemsWithFilter(name, register, voivodeship, category) {
        this.setState(
            {
                IDs: []
            }
        )

        let self = this;
        this.relicController.getDatabaseItemsWithFilter(name, register, voivodeship, category)
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


