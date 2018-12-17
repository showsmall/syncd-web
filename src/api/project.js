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

export function deleteProjectApi(params) {
    return post('/project/delete', params)
}
