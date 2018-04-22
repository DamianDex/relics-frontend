import React, {Component} from "react";
import {Card, CardBody, CardHeader, Collapse} from "reactstrap";

export default class ReviewCommentList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{paddingLeft: '5em'}}>
                <Collapse isOpen={this.props.isOpen}>
                    <Card>
                        <CardHeader>
                            <p>Nagłówek</p>
                        </CardHeader>
                        <CardBody>
                            <p>Komentarz</p>
                        </CardBody>
                    </Card>
                    <br/>
                </Collapse>
            </div>
        );
    }
}