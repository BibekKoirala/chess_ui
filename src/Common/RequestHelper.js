import { BaseUrl } from '../ServerSetting';
import CustomAxios from './CustomAxios';

export default class RequestHelper {
    
    static Get = (url, params, callback) => {
        CustomAxios.get(`${BaseUrl}/${url}/${params}`)
        .then(response => {
            if (response.status == 200) {
                callback(response, true)
            }
            else {
                callback(response, false)
            }
        })
        .catch(err => {
            callback(err.response, false);
        })
    }

    static Post = (url, payload, callback) => {
        CustomAxios.post(`${BaseUrl}/${url}`, payload)
        .then(response => {
            if (response.status == 200) {
                callback(response, true)
            }
            else {
                callback(response, false)
            }
        })
        .catch(err => {
            callback(err.response, false);
        })
    }
}
