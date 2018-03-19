import {CONFIGURATION} from '../configuration/configuration'
import axios from "axios";

export default class RelicController {
    constructor() {
        this.endpoint = CONFIGURATION.HOST + ':' + CONFIGURATION.PORT
    }

    getRandomRelicIds(count) {
        var response = axios.get('http://' + this.endpoint + '/api/relics/random/' + count);
        return response;
    }
}