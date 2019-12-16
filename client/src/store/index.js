import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../../config/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: localStorage.getItem('token'),
    products: [],
    cart: [],
    transactions: [],
    transactionsAsAdmin: [],
    cartSubtotal: 0,
    productToEdit: null,
    bgUrl: 'https://images.pexels.com/photos/3325917/pexels-photo-3325917.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  },
  mutations: {
    SET_EDIT_PRODUCT_TO_NULL (state, payload) {
      state.productToEdit = null
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
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
    SET_TRANSACTIONS_AS_ADMIN (state, payload) {
      state.transactionsAsAdmin = payload
    },
    SET_NEW_PRODUCT (state, payload) {
      state.products.unshift(payload)
    },
    SET_PRODUCT_AFTER_DELETE (state, payload) {
      let filtered = state.products.filter(item => {
        if (item._id != payload._id) {
          return item
        }
      })
      state.products = filtered
    },
    SET_EDITED_PRODUCT (state, payload) {
      for (let i = 0; i < state.products.length; i++) {
        if (state.products[i]._id == payload._id) {
          state.products[i] = payload
        }
      }
    },
    SET_AFTER_UPDATE_TRANSACTION (state, payload) {
      for (let i = 0; i < state.transactions.length; i++) {
        if (state.transactions[i]._id == payload._id) {
          state.transactions[i].status = payload.status
        }
      }
    },
    SET_PRODUCT_TO_EDIT (state, payload) {
      state.productToEdit = payload
    }
  },
  actions: {
    authAdmin ({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: '/login',
          data: {
            email: payload.email,
            password: payload.password
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    addProduct ({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        let formData = new FormData()
        formData.set('name', payload.name)
        formData.set('price', payload.price)
        formData.set('stock', payload.stock)
        formData.append('image', payload.image)

        axios({
          method: 'post',
          url: '/products',
          data: formData,
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            commit('SET_NEW_PRODUCT', data)
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    editProduct ({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'put',
          url: `/products/${state.productToEdit._id}`,
          data: payload,
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            commit('SET_EDITED_PRODUCT', data)
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    deleteProduct ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'delete',
          url: `/products/${payload}`,
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            commit('SET_PRODUCT_AFTER_DELETE', data)
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
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
    signIn ({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: '/login',
          data: payload,
          method: 'post'
        })
          .then(({ data }) => {
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
    fetchTransactionsAsAdmin ({ commit }, payload) {
      axios({
        method: 'get',
        url: '/transactions/admin',
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_TRANSACTIONS_AS_ADMIN', data)
        })
        .catch(err => {
          this.swal('error', err)
        })
    }
  },
  modules: {
  }
})
