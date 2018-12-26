import {get, post} from './fetch.js'

export function getRepoTagListApi(params) {
    return get('/deploy/repo/taglist', params)
}

export function resetRepoApi(data) {
    return post('/deploy/repo/reset', data)
}

export function getRepoCommitListApi(params) {
    return get('/deploy/repo/commitlist', params)
}

export function submitApplyApi(data) {
    return post('/deploy/apply/submit', data)
}

export function getApplyListApi(params) {
    return get('/deploy/apply/list', params)
}
