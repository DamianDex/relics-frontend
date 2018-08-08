import React, {Component} from "react";
import {Card, CardBody, CardHeader, ListGroup, ButtonGroup} from "reactstrap";
import RelicController from "../../controllers/RelicController";
import UserRelicListItem from "../profiles/user/userReviews/UserRelicListItem.js";
import PagesChooser from "./PagesChooser";

export default class ResultsPanel extends Component {


    constructor(props) {
        super(props);
        this.relicController = new RelicController();
        this.state = {
            page: 1,
            IDs: [],
            relicsPerPage: 5,
            filterSuffix: '',
            loadedRelics: 0
        }
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() {
        if (typeof this.props.place !== 'undefined'){
            this.getDatabaseItemsWithFilter(this.props.name, this.props.register,
                this.props.voivodeship, this.props.category, this.props.place);
        } else {
             this.getAdminDatabaseItemsWithFilter(this.props.filterSuffix);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (typeof this.props.place !== 'undefined'){
            this.getDatabaseItemsWithFilter(nextProps.name, nextProps.register,
                nextProps.voivodeship, nextProps.category, nextProps.place);
        } else {
            this.getAdminDatabaseItemsWithFilter(nextProps.filterSuffix);
        }
        if (sessionStorage.getItem('role') === 'ADMIN'){
            this.child.setPageToFirst();
        }
    }

    render() {
        let pagesChooser;
        if (sessionStorage.getItem('role') === 'ADMIN'){
            pagesChooser = <PagesChooser
                                handleChange={this.handlePageChange}
                                loadMore={this.state.loadedRelics === this.state.relicsPerPage}
                                ref={instance => { this.child = instance; }} />
        }
        return (
            <Card>
                <CardHeader align="center">
                        Wyniki wyszukiwania
                        {pagesChooser}
                </CardHeader>
                <CardBody>
                    <ListGroup>
                        {
                            this.state.IDs.map(id => {
                                    return (
                                        <UserRelicListItem id={id}/>
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

    getAdminDatabaseItemsWithFilter(filterSuffix) {
        var offset = this.state.page * this.state.relicsPerPage - this.state.relicsPerPage;
        this.setState({ IDs: []});
        if (filterSuffix !== '') {
            this.relicController.getAdminDatabaseItemsWithFilter(filterSuffix, offset)
                .then(response => {
                    this.setState(
                        {
                            IDs: response.data,
                            filterSuffix: filterSuffix,
                            loadedRelics: response.data.length
                        }
                    )
            })
            .catch(error => {
                console.log(error);
            })
        }
    }

    handlePageChange(page){
        this.setState({page: page})
        this.getAdminDatabaseItemsWithFilter(this.state.filterSuffix);
    }

}


