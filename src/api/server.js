import {get, post} from './fetch.js'

export function updateGroupApi(data) {
    return post('/server/group/update', data)
}
