import {get, post} from './fetch.js'

export function updateGroupApi(data) {
    return post('/user/group/update', data)
}

export function getGroupListApi(params) {
    return get('/user/group/list', params)
}

export function getGroupDetailApi(params) {
    return get('/user/group/detail', params)
}

export function getPrivListApi() {
    return get('/user/priv/list')
}
