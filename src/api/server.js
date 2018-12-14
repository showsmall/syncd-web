import {get, post} from './fetch.js'

export function updateGroupApi(data) {
    return post('/server/group/update', data)
}

export function getGroupListApi(params) {
    return get('/server/group/list', params)
}

export function getGroupDetailApi(params) {
    return get('/server/group/detail', params)
}

export function deleteGroupApi(data) {
    return post('/server/group/delete', data)
}

export function updateServerApi(data) {
    return post('/server/update', data)
}

export function getServerListApi(params) {
    return get('/server/list', params)
}

export function getServerDetailApi(params) {
    return get('/server/detail', params)
}

export function deleteServerApi(data) {
    return post('/server/delete', data)
}

export function getServerMultiApi(params) {
    return get('/server/multi', params)
}
