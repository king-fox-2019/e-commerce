import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../../config/server'
import Swal from 'sweetalert2'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
    currentUser: {},
    isLogin: false
  },
  mutations: {
    GET_PRODUCTS (state, payload) {
      state.products = payload
    },
    GET_CART (state, payload) {
      state.cart = payload
      console.log(state.cart)
    },
    CHANGE_ISLOGIN (state) {
      state.isLogin = true
    },
    LOGOUT (state) {
      state.isLogin = false
      localStorage.clear()
    }
  },
  actions: {
    getProducts (context) {
      axios({
        url: '/products',
        method: 'GET'
      })
        .then(({ data }) => {
          context.commit('GET_PRODUCTS', data)
        })
    },
    getCart (context) {
      axios({
        url: '/carts',
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('GET_CART', data)
        })
    },
    LoginUser (context, payload) {
      axios({
        method: 'POST',
        url: '/users/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          context.commit('CHANGE_ISLOGIN')
        })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response.data.message
          })
        })
    },
    RegisterUser (context, payload) {
      axios({
        method: 'POST',
        url: '/users/register',
        data: {
          name: payload.name,
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.token)
          context.commit('CHANGE_ISLOGIN')
        })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response.data.message
          })
        })
    },
    logout (context) {
      context.commit('LOGOUT')
    },
    checkLogin (context) {
      if (localStorage.getItem('access_token')) {
        context.commit('CHANGE_ISLOGIN')
      }
    },
    addToCart (context, payload) {
      axios({
        method: 'POST',
        url: `/carts/${payload}`,
        data: {
          productId: payload,
          // stock: payload.stock
        },
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data.result)
        })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response.data.message
          })
        })
    }
  },
  modules: {
  }
})
