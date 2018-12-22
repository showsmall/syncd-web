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

export function deleteGroupApi(data) {
    return post('/user/group/delete', data)
}

export function getPrivListApi() {
    return get('/user/priv/list')
}

export function updateUserApi(data) {
    return post('/user/update', data)
}

export function getUserListApi(params) {
    return get('/user/list', params)
}

export function getUserDetailApi(params) {
    return get('/user/detail', params)
}

export function checkUserExistsApi(params) {
    return get('/user/exists', params)
}

export function deleteUserApi(data) {
    return post('/user/delete', data)
}

export function searchUserApi(params) {
    return get('/user/search', params)
}
