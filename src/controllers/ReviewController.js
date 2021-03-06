import {CONFIGURATION} from '../configuration/configuration'
import axios from "axios";

export default class ReviewController {
    constructor() {
        this.endpoint = 'http://' + CONFIGURATION.HOST + ':' + CONFIGURATION.PORT + '/api/'
    }

    getAllReviewsByRelicId(id) {
        var response = axios.get(this.endpoint + 'relics/' + id + '/review')
        return response;
    }

    getMyRating(id) {
        var response = axios.get(this.endpoint + 'relics/' + id + '/user', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': sessionStorage.getItem("jwtToken")
            }
        });
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
        var filterChain = "?category=" + category + "&voivodeship=" + voivodeship;
        var response = axios.get(this.endpoint + 'relics/review/ranking/' + quantity + '/filter' + filterChain);
        return response;
    }

    postReview(id, rating, comment) {
        axios.post(this.endpoint + 'relics/review', {
            rating: rating,
            comment: comment,
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

    checkIfUserReviewRelic(relicId) {
        var response = axios.get(this.endpoint + 'relics/' + relicId + '/isReviewed', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': sessionStorage.getItem("jwtToken")
            }
        });
        return response;
    }
}