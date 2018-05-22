import {CONFIGURATION} from '../configuration/configuration'
import axios from "axios";

export default class ReviewCommentController {
    constructor() {
        this.endpoint = 'http://' + CONFIGURATION.HOST + ':' + CONFIGURATION.PORT + '/api/'
    }

    postReviewComment(id, comment) {
        axios.post(this.endpoint + 'relics/review/' + id + '/comment', {
            comment: comment
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

    getComments(id) {
        var response = axios.get(this.endpoint + 'relics/review/' + id + '/comments')
        return response;
    }
}