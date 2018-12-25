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
