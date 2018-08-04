import {CONFIGURATION} from '../configuration/configuration'
import axios from "axios";

export default class UserController {
    constructor() {
        this.endpoint = 'http://' + CONFIGURATION.HOST + ':' + CONFIGURATION.PORT + '/api/'
    }

    checkIfUserIsLogged() {
        var response = axios.get(this.endpoint + 'user/logged', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': sessionStorage.getItem("jwtToken")
            }
        })
        return response;
    }

    getUserDetails(){
            var response = axios.get(this.endpoint+'my-profile',{
                              headers: {
                                     'Accept': 'application/json',
                                     'Content-Type': 'application/json',
                                     'authorization': sessionStorage.getItem("jwtToken")
                                       }
                           });
            return response;
    }

}