import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/config/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: localStorage.getItem('token'),
    products: [],
    cartSubtotal: 0,
    cart: [],
    transactions: []
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_SESSION (state, payload) {
      state.isLoggedIn = payload
    },
    SET_CART (state, payload) {
      let total = 0
      let products = payload.products
      for (let x in products) {
        let price = products[x].item.price
        let quantity = products[x].quantity
        total += price * quantity
      }
      state.cartSubtotal = total
      state.cart = payload
    },
    SET_TRANSACTIONS (state, payload) {
      state.transactions = payload
    },
    SET_AFTER_UPDATE_TRANSACTION (state, payload) {
      for (let i = 0; i < state.transactions.length; i++) {
        if (state.transactions[i]._id == payload._id) {
          state.transactions[i].status = payload.status
        }
      }
    },
  },
  actions: {
    fetchProducts ({ commit }) {
      axios({
        method: 'get',
        url: '/products'
      })
      .then(({ data }) => {
        commit('SET_PRODUCTS', data)
      })
      .catch(err => {
        this.swal('error', err)
      })
    },
    fetchProductDetail ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: `/products/${payload}`
        })
        .then(({ data }) => {
          resolve(data)
        })
        .catch(err => {
          this.swal('error', err)
          reject(err)
        })
      })
    },
    fetchCart ({ commit }) {
      axios({
        method: 'get',
        url: '/carts',
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_CART', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchTransactions ({ commit }) {
      axios({
        method: 'get',
        url: '/transactions',
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_TRANSACTIONS', data)
        })
        .catch(err => {
          this.swal('error', err)
        })
    },
    addToCart ({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: '/carts',
          method: 'post',
          data: {
            item: payload.id,
            quantity: payload.quantity
          },
          headers: {
            authorization: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            commit('SET_CART', data)
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    removeItemFromCart ({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: '/carts',
          method: 'put',
          data: {
            item: payload.id,
            quantity: payload.quantity
          },
          headers: {
            authorization: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            commit('SET_CART', data)
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    checkout ({ commit, state }) {
      return new Promise((resolve, reject) => {
        axios({
          url: '/transactions',
          method: 'post',
          data: {
            cart: state.cart
          },
          headers: {
            authorization: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            commit('SET_CART', [])
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    confirmOrder ({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: `/transactions/${payload}`,
          method: 'PUT',
          data: {
            status: 'ORDER_RECEIVED'
          },
          headers: {
            authorization: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            commit('SET_AFTER_UPDATE_TRANSACTION', data)
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    signIn ({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: '/login',
          data: payload,
          method: 'post'
        })
          .then(({ data }) => {
            commit('SET_SESSION', true)
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    signUp ({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: '/register',
          data: payload,
          method: 'post'
        })
          .then(({ data }) => {
            console.log(data)
            commit('SET_SESSION', true)
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
  },
  modules: {
  }
})
