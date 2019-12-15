import axios from '../../../api/server'

const state = {
  listProduct: [],
  currentProduct: {}
}

const mutations = {
  SET_LIST_PRODUCT (state, payload) {
    state.listProduct = payload
  },
  SET_CURRENT_PRODUCT (state, payload) {
    state.currentProduct = payload
  }
}

const actions = {
  createProduct ({ commit }, payload) {
    return axios({
      url: '/product',
      method: 'POST',
      data: payload,
      headers: {
        access_token: localStorage.getItem('token')
      }
    })
  },
  uploadImage ({ commit }, payload) {
    return axios({
      url: '/image/upload-single',
      method: 'POST',
      data: payload,
      headers: {
        access_token: localStorage.getItem('token')
      }
    })
  },
  fetchProduct ({ commit }) {
    axios({
      url: '/product',
      method: 'GET',
      headers: {
        access_token: localStorage.getItem('token')
      }
    })
      .then(({ data }) => {
        commit('SET_LIST_PRODUCT', data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  updateCheckout ({ dispatch }, payload) {
    payload.forEach(item => {
      let data = {}
      data.id = item.id
      data.amount = item.amount
      dispatch('updateStock', data)
    })
  },
  updateStock ({ dispatch }, payload) {
    axios({
      url: `/product/${payload.id}/stock`,
      method: 'PUT',
      data: {
        amount: payload.amount
      },
      headers: {
        access_token: localStorage.getItem('token')
      }
    })
      .then(({ data }) => {
        dispatch('fetchProduct')
      })
      .catch(err => {
        console.log(err)
      })
  },
  getOneProduct ({ commit }, payload) {
    return axios({
      url: `/product/${payload.id}`,
      method: 'GET',
      headers: {
        access_token: localStorage.getItem('token')
      }
    })
  },
  editProduct ({ dispatch }, payload) {
    axios({
      url: `/product/${payload.id}`,
      method: 'PUT',
      data: payload.data,
      headers: {
        access_token: localStorage.getItem('token')
      }
    })
      .then(({ data }) => {
        console.log(data)
        dispatch('fetchProduct')
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export default {
  state,
  mutations,
  actions
}
