import {CONFIGURATION} from '../configuration/configuration'
import axios from "axios";

export default class CategoryController {
    constructor() {
        this.endpoint = 'http://' + CONFIGURATION.HOST + ':' + CONFIGURATION.PORT + '/api/'
    }

    getAllCategories() {
        var response = axios.get(this.endpoint + 'category');
        return response;
    }
}