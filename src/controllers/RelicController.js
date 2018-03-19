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
}