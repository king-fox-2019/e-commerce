import Vue from 'vue'
import Vuex from 'vuex'
import instance from '../connection/axios'
import axioserrHandler from '../connection/axiosErrorHandler'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    loginUser: null,
    products: [],
    cart: [],
    orders: [],
    snackbar: {
      visible: false,
      text: null,
      timeout: 3000
    }
  },
  // isLogin belum di watch
  mutations: {
    SHOW_SNACKBAR (state, payload) {
      state.snackbar.text = payload.text
      state.snackbar.visible = true
    },
    CLOSE_SNACKBAR (state) {
      state.snackbar.visible = false
      // state.snackbar.multiline = false
      // state.snackbar.timeout = 4000
      // state.snackbar.text = null
    },
    SET_LOGIN (state, payload) {
      console.log('SET_LOGIN')
      state.isLogin = payload
    },
    SET_USER (state, payload) {
      console.log('SET_USER')
      state.loginUser = payload
    },
    SET_PRODUCT (state, payload) {
      console.log('SET_PRODUCT')
      state.products = payload
    },
    ADD_PRODUCT (state, payload) {
      console.log('ADD_PRODUCT')
      state.products.push(payload)
    },
    SET_CART (state, payload) {
      console.log('SET_CART')
      state.cart = payload
      console.log('state.cart => ', state.cart)
    },
    SET_CART_COUNT (state, payload) {
      console.log('SET_CART_COUNT')
      state.cart[payload.index].count = payload.count
    },
    ADD_CART (state, payload) {
      console.log('ADD_CART')
      state.cart.push(payload)
    },
    SET_ORDERS (state, payload) {
      console.log('SET_ORDERS')
      state.orders = payload
    },
    ADD_ORDER (state, payload) {
      console.log('ADD_ORDER')
      state.orders.push(payload)
    }
  },
  actions: {
    getAllProducts ({ commit }) {
      console.log('getAllProducts')
      instance({
        method: 'GET',
        url: '/products'
      })
        .then(({ data }) => {
          console.log('data from getAllProducts => ', data)
          commit('SET_PRODUCT', data)
        })
        .catch(err => {
          console.log('err from getAllProducts => ', err)
          axioserrHandler(err)
        })
    },
    getCart ({ commit }) {
      console.log('getCart')
      let itemCount = {}
      for (let data of this.state.cart) {
        itemCount[data.product._id] = data.count
      }
      instance({
        method: 'GET',
        url: '/carts',
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log('data => ', data)
          let result = []
          for (let cartItem of data) {
            if (cartItem.product !== null) {
              cartItem.count = itemCount[cartItem.product._id] || 0
              result.push(cartItem)
            }
          }
          commit('SET_CART', result)
        })
        .catch(err => {
          console.log('err => ', err)
          axioserrHandler(err)
        })
    },
    getOrders ({ commit }) {
      console.log('getOrders')
      instance({
        method: 'GET',
        url: '/transactions',
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          commit('SET_ORDERS', data)
        })
        .catch(err => {
          console.log('err => ', err)
          axioserrHandler(err)
        })
    }
  }
})
