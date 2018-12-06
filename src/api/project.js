import {get, post} from './fetch.js'

export function newProject(data) {
    return post('/project/new', data)
}
