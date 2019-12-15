import axios from '../../../api/server'

const state = {
  listCart: []
}

const mutations = {
  SET_TO_CART (state, payload) {
    state.listCart = payload
  }
}

const actions = {
  addCart ({ dispatch }, payload) {
    return axios({
      url: '/cart',
      method: 'POST',
      data: {
        productId: payload.id,
        amount: 1
      },
      headers: {
        access_token: localStorage.getItem('token')
      }
    })
  },
  fetchCart ({ commit }) {
    axios({
      url: '/cart',
      method: 'GET',
      headers: {
        access_token: localStorage.getItem('token')
      }
    })
      .then(({ data }) => {
        commit('SET_TO_CART', data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  addAmount ({ dispatch }, payload) {
    return axios({
      url: `/cart/${payload}/add`,
      method: 'PUT',
      headers: {
        access_token: localStorage.getItem('token')
      }
    })
  },
  minAmount ({ dispatch }, payload) {
    return axios({
      url: `/cart/${payload}/min`,
      method: 'PUT',
      headers: {
        access_token: localStorage.getItem('token')
      }
    })
  },
  deleteItem ({ dispatch }, payload) {
    return axios({
      url: `/cart/${payload}`,
      method: 'DELETE',
      headers: {
        access_token: localStorage.getItem('token')
      }
    })
      .then(({ data }) => {
        dispatch('fetchCart')
      })
      .catch(err => {
        console.log(err)
      })
  },
  deleteMany ({ dispatch }, payload) {
    axios({
      url: '/cart',
      method: 'DELETE',
      headers: {
        access_token: localStorage.getItem('token')
      }
    })
      .then(({ data }) => {
        dispatch('fetchCart')
      })
  }
}

export default {
  state,
  mutations,
  actions
}
