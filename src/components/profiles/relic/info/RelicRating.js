import React, {Component} from "react";
import {Card, CardBody, CardHeader, Input, Label, Button} from "reactstrap";
import ReviewController from "../../../../controllers/ReviewController";
import "./RelicRating.css"
import RelicsToSeeController from "../../../../controllers/RelicsToSeeController";

export default class RelicRating extends Component {
    constructor(props) {
        super(props);

        this.reviewController = new ReviewController();
        this.relicsToSeeController = new RelicsToSeeController();

        this.state = {
            isChecked: false,
            accessToCheck: true
        };

        this.postRelicToSee = this.postRelicToSee.bind(this);
    }

    componentDidMount() {
        this.getMyRating();
        this.getAvgRating();
        this.getRatingCount();
        this.checkIfUserWantToSeeRelic();
    }

    postRelicToSee(){
        this.setState({isChecked:!this.state.isChecked})
        var relicToSee = !this.state.isChecked
        this.relicsToSeeController.postRelicToSee(this.props.id, relicToSee)
    }

    checkIfUserWantToSeeRelic() {
        let self = this;
        this.relicsToSeeController.checkIfUserWantToSeeRelic(this.props.id)
            .then(response => {
                self.setState(
                    {
                        isChecked: response.data,
                        accessToCheck: response.data
                    }
                )
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <Card>
                <CardHeader>Wasze oceny</CardHeader>
                <CardBody>
                    <div class="ratings-body">
                        <b>Ocena użytkowników:</b> {Math.round(this.state.avg * 100) / 100} / 5.00 <br/>
                        <b>Liczba głosów:</b> {this.state.count} <br/>
                        <b>Twoja ocena:</b> {this.state.myRating} <br/><br/>
                        <Label check>
                              <Input type="checkbox" name="relicToSee"
                                     id="relicToSee"
                                     checked={this.state.isChecked}
                                     disabled={this.state.accessToCheck}
                                     onChange={this.postRelicToSee}
                                     />
                              <b>Chcę zobaczyć</b>
                        </Label>
                    </div>
                </CardBody>
            </Card>
        );
    }

    getAvgRating() {
        let self = this;
        this.reviewController.getAvgRating(this.props.id)
            .then(response => {
                self.setState(
                    {
                        avg: response.data
                    }
                )
            })
            .catch(error => {
                console.log(error);
            })
    }

    getRatingCount() {
        let self = this;
        this.reviewController.getRatingCount(this.props.id)
            .then(response => {
                self.setState(
                    {
                        count: response.data
                    }
                )
            })
            .catch(error => {
                console.log(error);
            })
    }

    getMyRating() {
        let self = this;

        this.setState({
            myRating: "Nie jesteś zalogowany"
        })

        this.reviewController.getMyRating(this.props.id)
            .then(response => {

                if (response.data != "") {
                    self.setState(
                        {
                            myRating: response.data
                        }
                    )
                } else {
                    self.setState(
                        {
                            myRating: "--"
                        }
                    )
                }
            })
            .catch(error => {
                console.log(error);
            })
    }


}


