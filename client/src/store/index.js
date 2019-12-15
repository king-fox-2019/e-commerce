import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../../config/axios'
import toastMixin from '../mixins/toastMixin'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    access_token: localStorage.getItem('access_token') || '',
    isLoggedIn: false,
    currentUser: {},
    allProducts: [],
    myCart: [],

    myTransactions: [],
    myActiveTransactions: [],
    myTransactionsHistory: [],
    allTransactions: [],
    transaction: {}
  },

  mutations: {

    FETCH_ALL_PRODUCTS(state, payload) {
      state.allProducts = payload
    },

    FETCH_MY_ACTIVE_CART(state, payload) {
      // console.log('ini payload pas fetch my cart', payload[0])
      payload[0] ? state.myCart = payload[0] : state.myCart = []
    },

    FETCH_MY_ACTIVE_TRANSACTIONS(state, payload) {
      state.myActiveTransactions = payload
    },

    FETCH_MY_TRANSACTIONS_HISTORY(state, payload) {
      state.myTransactionsHistory = payload
    },

    FETCH_A_TRANSACTION(state, payload) {
      state.transaction = payload
    },

    FETCH_ALL_TRANSACTIONS(state, payload) {
      state.allTransactions = payload
    },

    UPDATE_LOGIN_STATUS(state, payload) {
      state.isLoggedIn = payload
      // console.log('ini di update login status', state.isLoggedIn)
    },

    FETCH_CURRENT_USER(state, { _id, name, email, role }) {
      state.currentUser = { _id, name, email, role }
      // console.log('fetch current user', state.currentUser);
    }
  },

  actions: {
    fetchAllProducts({ commit }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: '/products'
        })
          .then(({ data }) => {
            commit('FETCH_ALL_PRODUCTS', data)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    fetchMyActiveTransactions({ commit }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: '/transactions/user?active=true',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
          .then(({ data }) => {
            commit('FETCH_MY_ACTIVE_TRANSACTIONS', data.transactions)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    fetchMyTransactionsHistory({ commit }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: '/transactions/user?history=true',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
          .then(({ data }) => {
            commit('FETCH_MY_TRANSACTIONS_HISTORY', data.transactions)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    fetchAllTransactions({ commit }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: '/transactions',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
          .then(({ data }) => {
            commit('FETCH_ALL_TRANSACTIONS', data.transactions)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    fetchMyCart({ commit }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: '/carts/all',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
          .then(({ data }) => {
            // console.log('ini data di store/action/fetchMyCart', data)
            const activeCart = data.cart.filter(cart => !cart.isCheckedOut)
            // console.log('ini active cart skrg', activeCart)
            commit('FETCH_MY_ACTIVE_CART', activeCart)

            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    checkToken({ dispatch, commit }) {

      // console.log('masuk checktoken')

      return new Promise((resolve, reject) => {

        try {
          let isLoggedIn

          if (localStorage.getItem('access_token')) {
            isLoggedIn = true
          } else {
            isLoggedIn = false
          }
          dispatch('fetchCurrentUser')
          commit('UPDATE_LOGIN_STATUS', isLoggedIn)
          resolve()
        }
        catch (err) { reject(err) }
      })
    },

    fetchCurrentUser({ commit }) {
      // console.log('masuk fetch current user');
      return new Promise((resolve, reject) => {
        // console.log('ini access token pas fetch user', localStorage.getItem('access_token'));
        axios({
          method: 'GET',
          url: '/users/user',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
          .then(({ data }) => {
            // console.log('ini data pas fetch user', data)
            commit('FETCH_CURRENT_USER', data.user)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  },

  getters: {

    totalItem: state => {
      try {
        let totalQty = 0
        // console.log('ini state myCart di getters/totalItem', state.myCart);
        if (state.myCart.products) {
          state.myCart.products.forEach(product => {
            if (product.qty) totalQty += product.qty;
          })
        }

        return totalQty

      } catch (error) {
        console.log(error)
      }
    },

    totalPrice: state => {
      try {
        let totalPrice = 0;
        // console.log("ini total products di store/getters/totalPrice", state.myCart);
        if (state.myCart.products) {
          state.myCart.products.forEach(product => {
            // console.log("ini each product di store/getters/totalPrice", product);
            if (product.product.price)
              totalPrice += product.product.price * product.qty;
          })
        }
        return totalPrice

      } catch (error) {
        console.log(error)
      }
    }
  },

  mixins: [toastMixin]
})