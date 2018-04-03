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

    getAvgRating(id) {
        var response = axios.get(this.endpoint + 'relics/' + id + '/review/avg');
        return response;
    }

    getRatingCount(id) {
        var response = axios.get(this.endpoint + 'relics/' + id + '/review/count');
        return response;
    }

    getTopRankedRelicIDs(quantity) {
        var response = axios.get(this.endpoint + 'relics/review/ranking/' + quantity);
        return response;
    }

    getTopRankedRelicIDsWithFilter(quantity, category, voivodeship) {
        var filterChain = "?category=Mieszkalny&voivodeship=opolskie";
        var response = axios.get(this.endpoint + 'relics/review/ranking/' + quantity + '/filter' + filterChain);
        return response;
    }

    postReview(id, rating, comment) {
        axios.post(this.endpoint + 'relics/review', {
            rating: rating,
            comment: comment,
            appUser: {
                id: 1
            },
            relic: {
                id: id
            }
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

    checkIfUserReviewRelic(relicId, userId) {
        var response = axios.get(this.endpoint + 'relics/' + relicId + '/review/' + userId);
        return response;
    }
}