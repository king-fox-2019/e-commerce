import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../../apis/server'
import Swal from 'sweetalert2'
// import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    products: [],
    cart: []
  },
  mutations: {
    setLogin (state, payload) {
      state.isLogin = payload
    },
    setProducts (state, payload) {
      state.products = payload
    },
    setCart (state, payload) {
      state.cart = payload
    }
  },
  actions: {
    getAllProducts ({ commit }) {
      axios({
        url: `/products`,
        method: 'GET'
      })
        .then(({ data }) => {
          commit('setProducts', data)
        })
        .catch(err => [
          console.log(err)
        ])
    },
    addToCart ({ commit }, payload) {
      axios({
        url: `/users/cart`,
        method: 'PATCH',
        data: {
          product_id: payload.product_id,
          quantity: 1
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Added to cart',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          console.log(err)
          Swal.fire('Errors', `Something went wrong`, `error`)
        })
    },
    viewCart ({ commit }, payload) {
      axios({
        url: `/users/cart`,
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('setCart', data)
        })
        .catch(err => {
          console.log(err)
          Swal.fire('Errors', `Something went wrong`, `error`)
        })
    },
    substractCart ({ dispatch }, payload) {
      axios({
        url: `/users/cart/substract`,
        method: 'PATCH',
        data: {
          product_id: payload
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          dispatch('viewCart')
        })
        .catch(err => {
          console.log(err)
          Swal.fire('Errors', `Something went wrong`, `error`)
        })
    },
    addToCartFromCartPage ({ dispatch }, payload) {
      axios({
        url: `/users/cart`,
        method: 'PATCH',
        data: {
          product_id: payload,
          quantity: 1
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          dispatch('viewCart')
        })
        .catch(err => {
          console.log(err)
          Swal.fire('Errors', `Something went wrong`, `error`)
        })
    }
  },
  modules: {
  }
})
