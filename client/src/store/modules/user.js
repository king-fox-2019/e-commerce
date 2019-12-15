import axios from '../../../api/server'

const state = {
  isLogin: false,
  session: ''
}

const mutations = {
  SET_IS_LOGIN (state, payload) {
    state.isLogin = payload
  },
  SET_ROLE (state, payload) {
    state.session = payload
  }
}

const actions = {
  register ({ commit }, payload) {
    return axios({
      url: '/user/register',
      method: 'POST',
      data: payload
    })
  },
  login ({ commit }, payload) {
    return axios({
      url: '/user/login',
      method: 'POST',
      data: payload
    })
  },
  checkLogin ({ commit }) {
    let valid = localStorage.getItem('token')
    if (valid) {
      commit('SET_IS_LOGIN', true)
    } else {
      commit('SET_IS_LOGIN', false)
    }
  }
}

export default {
  state,
  mutations,
  actions
}
