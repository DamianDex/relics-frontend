import {CONFIGURATION} from '../configuration/configuration'
import axios from "axios";

export default class RelicController {
    constructor() {
        this.endpoint = 'http://' + CONFIGURATION.HOST + ':' + CONFIGURATION.PORT + '/api/'
    }

    getRandomRelicIds(count) {
        var response = axios.get(this.endpoint + 'relics/random/' + count);
        return response;
    }

    getRelicDetails(id) {
        var response = axios.get(this.endpoint + 'relics/' + id);
        return response;
    }

    getGeographicLocation(id) {
        var response = axios.get(this.endpoint + 'geographic/' + id);
        return response;
    }

    getRandomRelicIDsByDistance(latitude, longitude) {
        var filterChain = "?latitude=" + latitude + "&longitude=" + longitude;
        var response = axios.get(this.endpoint + 'relics/recommend/distance' + filterChain);
        return response;
    }

    recommendByUserReviews() {
        var response = axios.get(this.endpoint + 'relics/recommend/reviews', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': sessionStorage.getItem("jwtToken")
            }
        });
        return response;
    }

    getDatabaseItemsWithFilter(name, register, voivodeship, category, place) {
        var filterChain = "?name=" + name + "&register=" + register + "&voivodeship=" + voivodeship +
            "&category=" + category + "&place=" + place;
        var response = axios.get(this.endpoint + 'relics/filter' + filterChain);
        return response;
    }

    getRelicsInRouteBuffer(routeArray, buffer) {
        try {
            var response = axios.post(this.endpoint + 'relics/route-buffer', {
                routeArray: routeArray,
                buffer: buffer })
                return response;
            } catch (error) {
               	console.log(error);
            }
    }
}