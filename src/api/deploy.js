import {get, post} from './fetch.js'

export function submitApplyApi(data) {
    return post('/deploy/apply/submit', data)
}

export function getApplyListApi(params) {
    return get('/deploy/apply/list', params)
}

export function getApplySpaceList(params) {
    return get('/deploy/apply/space/list', params)
}

export function  getApplyProjectList(params) {
    return get('/deploy/apply/project/list', params)
}

export function getApplyProjectDetailApi(params) {
    return get('/deploy/apply/project/detail', params)
}

export function getRepoTagListApi(params) {
    return get('/deploy/apply/repo/taglist', params)
}

export function getRepoCommitListApi(params) {
    return get('/deploy/apply/repo/commitlist', params)
}

export function getApplyDetailApi(params) {
    return get('/deploy/apply/detail', params)
}
