import axios from '../../../api/server'

const state = {
  listTransaction: []
}

const mutations = {
  SET_LIST_TRANSACTION (state, payload) {
    state.listTransaction = payload
  }
}

const actions = {
  createTransaction ({ dispatch }, payload) {
    return axios({
      url: '/transaction',
      method: 'POST',
      data: payload,
      headers: {
        access_token: localStorage.getItem('token')
      }
    })
  },
  fetchTransaction ({ commit }, payload) {
    if (payload === 'customer') {
      axios({
        url: '/transaction/user',
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_LIST_TRANSACTION', data)
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      axios({
        url: '/transaction',
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_LIST_TRANSACTION', data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  sendItem ({ context }, payload) {
    console.log('masuk vuex')
    return axios({
      url: `/transaction/${payload.id}/sent`,
      method: 'PUT',
      headers: {
        access_token: payload.token
      }
    })
  },
  confirmedItem ({ context }, payload) {
    return axios({
      url: `/transaction/${payload.id}/received`,
      method: 'PUT',
      headers: {
        access_token: payload.token
      }
    })
  }
}

export default {
  state,
  mutations,
  actions
}
