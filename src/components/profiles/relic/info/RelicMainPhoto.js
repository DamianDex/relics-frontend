import React, {Component} from "react";

export default class RelicMainPhoto extends Component {

    constructor(props) {
        super(props);

        this.state = {
            imageSrc: '/images/images.jpg'
        }
    }

    render() {
        return (
                <img src={process.env.PUBLIC_URL + this.state.imageSrc}/>
        );
    }
}


