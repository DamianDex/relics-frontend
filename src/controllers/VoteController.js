import {CONFIGURATION} from '../configuration/configuration'
import axios from "axios";

export default class VoteController {
    constructor() {
        this.endpoint = 'http://' + CONFIGURATION.HOST + ':' + CONFIGURATION.PORT + '/api/'
    }

    postVote(id) {
        axios.post(this.endpoint + 'review/' + id + '/vote', {
            isPositive: true
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': sessionStorage.getItem("jwtToken")
            }
        }).then(function (response) {
            console.log(response);
        })
            .catch(function (error) {
                console.log(error);
            });
    }
}