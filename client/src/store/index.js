'use strict'

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import errorHandler from '@/helpers/errorHandler'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: 'http://localhost:3000',
    products: [],
    email: '',
    id: '',
    cart: [],
    printCart: []
  },
  mutations: {
    setProducts (state, data) {
      // console.log('masuk mutation')
      state.products = data
      // console.log(state.products)
    },
    setAddToCart (state, product) {
      console.log(product)
      state.cart.push(product)
      axios({
        url: `${state.baseUrl}/users/cart`,
        method: 'POST',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          cart: state.cart
        }
      })
        .then(cart => {
          console.log(`ini dari state`)
          console.log(cart.data)
          state.printCart = cart.data
        })
        .catch(err => {
          console.log(`ini error ${err}`)
        })
    },
    setUpdateCart (state, id) {
      let newCart = []
      let obj
      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i].ProductId !== id) {
          newCart.push(state.cart[i])
        } else {
          obj = state.cart[i]
          obj.quantity += 1
          newCart.push(obj)
        }
      }
      state.cart = newCart
      axios({
        url: `${state.baseUrl}/users/cart`,
        method: 'POST',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          cart: state.cart
        }
      })
        .then(user => {
          console.log(user)
        })
        .catch(err => {
          console.log(err)
        })
    },
    setDelete (state) {
      state.printCart = []
      state.cart = []
    }
  },
  actions: {
    getProducts (context, data) {
      axios({
        url: `${this.state.baseUrl}/products`,
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          context.commit('setProducts', data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
