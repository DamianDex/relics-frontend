import {CONFIGURATION} from '../configuration/configuration'
import axios from "axios";

export default class RelicsToSeeControler{

    constructor(){
        this.endpoint = 'http://' + CONFIGURATION.HOST + ':' + CONFIGURATION.PORT + '/api/'
    }

    postRelicToSee(id,isChecked) {
        axios.post(this.endpoint + 'relics/relics-to-see', {
            relicToSee: isChecked,
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

    checkIfUserWantToSeeRelic(relicId) {
        var response = axios.get(this.endpoint + 'relics/' + relicId + '/isChecked', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': sessionStorage.getItem("jwtToken")
            }
        });
        return response;
    }

    getRelicsToSeeByUser(category, place) {
        var filterChain = "?category=" + category + "&place=" + place;
        var response = axios.get(this.endpoint + 'relics-to-see' + filterChain,
        {
              headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'authorization': sessionStorage.getItem("jwtToken")
                        }
        });
        return response;
    }
}