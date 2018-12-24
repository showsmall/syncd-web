import {get, post} from './fetch.js'

export function getRepoTagList() {
    return get('/deploy/repo/taglist')
}
