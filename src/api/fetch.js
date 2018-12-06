import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'

let API_URL = 'http://localhost:8868/api'
let CancelToken = axios.CancelToken
let source = CancelToken.source()

Vue.prototype.$CancelAjaxRequet = function() {}

const service = axios.create({
    baseURL: API_URL + '/',
    timeout: 5000
});

service.interceptors.request.use(config => {
    return config
}, error => {
    Promise.reject(error)
});

service.interceptors.response.use(response => {
    let res = response.data
    if (!res) {
        res = {
            code: -1,
            message: 'Network Error',
        }
    }
    if (res.code != 0) {
        Vue.prototype.$message.error(res.message)
        return Promise.reject(res)
    }
    return res.data;
}, error => {
    if (!axios.isCancel(error)) {
        let res = {
            code: -1,
            message: error.message ? error.message : 'Unknown Error',
        }
        Vue.prototype.$message.error(res.message)
        return Promise.reject(res)
    }
    return Promise.reject(error)
});

export function post(url, data, params, headers) {
    if (!params) {
        params = {}
    }
    //params._token = Util.LoginToken()
    params._t = new Date().getTime()
    let config = {
        method: 'post',
        url: url,
        params,
    }
    if (data) {
        if (headers && headers['Content-Type'] == 'multipart/form-data') {
            config.data = data
        } else {
            config.data = qs.stringify(data)
        }
    }
    if (headers) {
        config.headers = headers
    }
    return service(config)
};

export function get(url, params, headers) {
    if (!params) {
        params = {}
    }
    params._token = Util.LoginToken()
    params._t = new Date().getTime()
    let config = {
        method: 'get',
        url: url,
        params,
    }
    if (headers) {
        config.headers = headers
    }

    config.cancelToken = new CancelToken(function(cancel) {
        Vue.prototype.$CancelAjaxRequet = function() {
            cancel()
        }
    })

    return service(config)
}

export default service;
