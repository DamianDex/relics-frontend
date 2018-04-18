import {CONFIGURATION} from '../configuration/configuration'
import axios from "axios";

export default class VoteController {
    constructor() {
        this.endpoint = 'http://' + CONFIGURATION.HOST + ':' + CONFIGURATION.PORT + '/api/'
    }

    postVote(id, value) {
        axios.post(this.endpoint + 'review/' + id + '/vote', {
            isPositive: value
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

    getPositiveVotesQuantity(id) {
        var response = axios.get(this.endpoint + 'review/' + id + '/vote/positive');
        return response;
    }

    getNegativeVotesQuantity(id) {
        var response = axios.get(this.endpoint + 'review/' + id + '/vote/negative');
        return response;
    }
}