import {CONFIGURATION} from '../configuration/configuration'
import axios from "axios";

export default class ReviewController {
    constructor() {
        this.endpoint = 'http://' + CONFIGURATION.HOST + ':' + CONFIGURATION.PORT + '/api/'
    }

    getAllReviewsByRelicId(id) {
        var response = axios.get(this.endpoint + 'relics/' + id + '/review');
        return response;
    }

    postReview(id, rating, comment) {
        axios.post(this.endpoint + 'relics/review', {
            rating: '5',
            comment: 'Słaby',
            appUser: {
                id: 1
            },
            relic: {
                id: 591683
            }
        }, {
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        }).then(function (response) {
            console.log(response);
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    checkIfUserReviewRelic(relicId, userId) {
        var response = axios.get(this.endpoint + 'relics/' + relicId + '/review/' + userId);
        return response;
    }
}