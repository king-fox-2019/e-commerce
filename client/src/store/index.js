import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    isLogin: false,
    user: {},
    totalCart: 0
  },
  mutations: {
    FETCH_PRODUCTS (state, payload) {
      state.products = payload
    },
    FETCH_USER (state, payload) {
      state.user = payload
    },
    LOGIN (state) {
      state.isLogin = true
    },
    LOGOUT (state) {
      state.isLogin = false
      localStorage.clear()
    },
    SUM_CART (state) {
      state.totalCart = state.user.carts.reduce(function (total, cart) {
        return total + (cart.productPrice * cart.quantity)
      }, 0)
    }
  },
  actions: {
    checkLogin (context) {
      if (localStorage.getItem('token')) {
        context.commit('LOGIN')
        context.dispatch('fetchUser')
      }
    },
    fetchProducts (context) {
      axios({
        url: `/products`,
        method: 'GET'
      })
        .then(({ data }) => {
          context.commit('FETCH_PRODUCTS', data)
        })
        .catch(err => {
          this.$swal.fire(
            'sumting wong',
            err,
            'error'
          )
        })
    },
    fetchUser (context) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'GET',
          url: `/user/cart`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            context.commit('FETCH_USER', data)
            resolve()
          })
          .catch(err => {
            this.$swal.fire(
              'sumting wong',
              err,
              'error'
            )
            reject(err)
          })
      })
    },
    login (context, payload) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'POST',
          url: `/user/login`,
          data: {
            email: payload.email,
            password: payload.password
          }
        })
          .then(({ data }) => {
            localStorage.setItem('token', data.token)
            context.commit('LOGIN')
            context.dispatch('fetchUser')
            resolve()
          })
          .catch(err => {
            this.$swal.fire(
              'sumting wong',
              err,
              'error'
            )
            reject(err)
          })
      })
    }
  },
  modules: {
  }
})
