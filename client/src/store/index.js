import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userID: null,
    products: [],
    cart: []
  },
  mutations: {
    setUserID(state, payload) {
      // console.log('sedang setUserID');
      // console.log(state, payload, 'asd')
      state.userID = payload
      // console.log(this.state.userID);
    },
    fillProduct(state, payload) {
      state.products = payload
    },
    fillCart(state, payload) {
      state.cart = payload
    }
  },
  actions: {
    fetchAllProducts(context) {
      console.log('masuk action')
      axios({
        method: 'get',
        url: 'http://localhost:3000/products'
      })
        .then(({ data }) => {
          console.log(data)
          context.commit('fillProduct', data)
        })
        .catch((err) => console.log(err, 'error disini'))
    },
    fetchCart(context) {
      console.log('masuk fetch cart');
      axios({
        method: 'get',
        url: 'http://localhost:3000/users/cart',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('fillCart', data)
        })
        .catch((error) => {
          console.log(error.response.data.message, "error fetching cart");
        });
    }
  },
  getters: {
    getProducts: (state) => {
      return state.products
    },
    getCart: (state) => {
      return state.cart
    }
  },
  modules: {
  }
})
