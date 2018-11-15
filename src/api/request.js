import {API_HOST} from "./url";

class Request {
    static xmlRequest(method, url, params, body) {
        if (method === 'GET') {
            body = undefined;
        } else {
            body = body && JSON.stringify(body);
        }
        let wholeUrl = this.makeUrl(url, params);
        return fetch(url, {
            method: method || 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: body,
            mode: 'cors'
        }).then((res) => {
            if (res.status === 200) {
                return res;
            } else {
                return Promise.reject('error!!!');
            }
        });
    }

    // before launch a fetch request, joint url and params
    static makeUrl (url, params) {
        let apiUrl = url.split('?')[0];
        let urlParams = '';

        for (let i in params) {
            if (params.hasOwnProperty(i)) {
                apiUrl = apiUrl.replace('{' + i + '}', encodeURIComponent(params[i]));
                urlParams += i + '=' + params[i] + '&'
            }
        }
        apiUrl += urlParams.substring(0, urlParams.length - 1);
        return API_HOST + apiUrl;
    }

}

const get = (url, params) => Request.xmlRequest('GET', url, params);
const post = (url, params, body) => Request.xmlRequest('POST', url, params, body);

export default {
    get,
    post,
}