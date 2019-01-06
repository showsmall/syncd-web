import md5 from 'blueimp-md5'

const state = {
    user_id: 0,
    name: '',
    email: '',
    priv: [],
}

const getters = {
    isLogin(state) {
        return state.userId > 0
    },
    getUserName(state) {
        return state.name
    },
    getUserId(state) {
        return state.user_id
    },
    getAvatar(state) {
        return 'https://www.gravatar.com/avatar/' + md5(state.email.toLowerCase()) + '?s=40'
    },
    getPriv(state) {
        return state.priv ? state.priv : []
    }
}

const actions = {
    login({ commit }, userInfo) {
        commit('setUserInfo', {
            user_id: userInfo.user_id,
            name: userInfo.name,
            email: userInfo.email,
            priv: userInfo.priv,
        })
    },
}

const mutations = {
    setUserInfo(state, userInfo) {
        state.user_id = userInfo.user_id
        state.name = userInfo.name
        state.email = userInfo.email
        state.priv = userInfo.priv
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
