import {get, post} from './fetch.js'

export function updateProjectApi(data) {
    return post('/project/update', data)
}

export function listProjectApi(params) {
    return get('/project/list', params)
}

export function getProjectApi(params) {
    return get('/project/detail', params)
}

export function deleteProjectApi(data) {
    return post('/project/delete', data)
}

export function getSpaceListApi(params) {
    return get('/project/space/list', params)
}

export function updateSpaceApi(data) {
    return post('/project/space/update', data)
}

export function getSpaceDetailApi(params) {
    return get('/project/space/detail', params)
}

export function deleteSpaceApi(data) {
    return post('/project/space/delete', data)
}

export function checkSpaceNameExistsApi(params) {
    return get('/project/space/exists', params)
}

export function checkProjectNameExistsApi(params) {
    return get('/project/exists', params)
}

export function addSpaceUserApi(data) {
    return post('/project/space/user/add', data)
}

export function getSpaceUserListApi(params) {
    return get('/project/space/user/list')
}

export function removeSpaceUserApi(data) {
    return post('/project/space/user/remove', data)
}
