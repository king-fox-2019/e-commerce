import axios from '../../../api/server'

const state = {
  isLogin: false,
  session: '',
  gold: 0
}

const mutations = {
  SET_IS_LOGIN (state, payload) {
    state.isLogin = payload
  },
  SET_ROLE (state, payload) {
    state.session = payload
  },
  SET_USER_GOLD (state, payload) {
    state.gold = payload
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
  checkLogin ({ commit, dispatch }) {
    let valid = localStorage.getItem('token')
    let user = localStorage.getItem('user')
    if (valid && user === 'admin') {
      commit('SET_IS_LOGIN', true)
      commit('SET_ROLE', 'admin')
    } else if (valid && user !== 'admin') {
      commit('SET_IS_LOGIN', true)
      commit('SET_ROLE', 'customer')
      dispatch('getUserGold')
    } else {
      commit('SET_IS_LOGIN', false)
    }
  },
  getUserGold ({ commit }) {
    axios({
      url: '/user/gold',
      method: 'GET',
      headers: {
        access_token: localStorage.getItem('token')
      }
    })
      .then(({ data }) => {
        commit('SET_USER_GOLD', data.gold)
      })
      .catch(err => {
        console.log(err)
      })
  },
  topUp ({ commit }, payload) {
    return axios({
      url: '/user/balance',
      method: 'PUT',
      data: {
        balance: payload
      },
      headers: {
        access_token: localStorage.getItem('token')
      }
    })
  }
}

export default {
  state,
  mutations,
  actions
}
