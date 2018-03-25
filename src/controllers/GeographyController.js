import {CONFIGURATION} from '../configuration/configuration'
import axios from "axios";

export default class GeographyController {
    constructor() {
        this.endpoint = 'http://' + CONFIGURATION.HOST + ':' + CONFIGURATION.PORT + '/api/'
    }

    getRelicGeography(id) {
        var response = axios.get(this.endpoint + 'geographic/' + id);
        return response;
    }
}