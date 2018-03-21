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
}