import React, {Component} from "react";
import {Card, CardBody, CardHeader, ListGroup} from "reactstrap";
import RankingListItem from "../ranking/RankingListItem";
import RelicController from "../../controllers/RelicController";

export default class AdminRelicsResultPanel extends Component {


    constructor(props) {
        super(props);

        this.relicController = new RelicController();

        this.state = {
            IDs: [],
        }
    }

    componentDidMount() {
        this.getDatabaseItemsWithFilter(this.props.name, this.props.register,
            this.props.voivodeship, this.props.category, this.props.place);
    }

    componentWillReceiveProps(nextProps) {
        this.getDatabaseItemsWithFilter(nextProps.name, nextProps.register,
            nextProps.voivodeship, nextProps.category, nextProps.place);
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

    getDatabaseItemsWithFilter(name, register, voivodeship, category, place) {
        this.setState(
            {
                IDs: []
            }
        )

        let self = this;
        this.relicController.getDatabaseItemsWithFilter(name, register, voivodeship, category, place)
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


