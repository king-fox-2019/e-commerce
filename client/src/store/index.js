import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../../apis/server'
import Swal from 'sweetalert2'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    products: [],
    cart: [],
    transactions: [],
    adminTransactions: []
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
    },
    setTransactions (state, payload) {
      state.transactions = payload
    },
    setAdminTransactions (state, payload) {
      state.adminTransactions = payload
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
          Swal.fire('Errors', `Something went wrong 1`, `error`)
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
          Swal.fire('Errors', `Something went wrong 2`, `error`)
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
          Swal.fire('Errors', `Something went wrong 3`, `error`)
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
          Swal.fire('Errors', `${err.response.data.message}`, `error`)
        })
    },
    removeFromCart ({ dispatch }, payload) {
      axios({
        url: `/users/cart`,
        method: 'DELETE',
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
          console.log(err.response)
          Swal.fire('Errors', `Something went wrong 6`, `error`)
        })
    },
    createTransaction ({ dispatch }) {
      axios({
        url: `/transactions`,
        method: 'POST',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          dispatch('getUserTransactions')
          router.push('/transaction')
        })
        .catch(err => {
          console.log(err)
          Swal.fire('Errors', `${err.response.data.message}`, `error`)
        })
    },
    getUserTransactions ({ commit }) {
      axios({
        url: `/transactions`,
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('setTransactions', data)
        })
        .catch(err => {
          console.log(err)
          Swal.fire('Errors', `Something went wrong 7`, `error`)
        })
    },
    confirmTransaction ({ dispatch }, payload) {
      axios({
        url: `/transactions/${payload}`,
        method: 'PATCH',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          dispatch('getUserTransactions')
        })
        .catch(err => {
          console.log(err)
          Swal.fire('Errors', `Something went wrong 8`, `error`)
        })
    },
    addProduct ({ commit }, payload) {
      const formData = new FormData()
      formData.set('name', payload.productName)
      formData.set('price', payload.productPrice)
      formData.set('stock', payload.productStock)
      formData.append('image', payload.productImage)

      axios({
        url: `/products`,
        method: 'POST',
        data: formData,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Added a new product',
            showConfirmButton: false,
            timer: 1500
          })
          router.push('/admin')
        })
        .catch(err => {
          console.log(err)
          Swal.fire('Errors', `Something went wrong 9`, `error`)
        })
    },
    deleteProduct ({ dispatch }, payload) {
      axios.delete(`/products/${payload}`,
        { headers: { token: localStorage.getItem('token') } })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Product Deleted',
            showConfirmButton: false,
            timer: 1500
          })
          dispatch('getAllProducts')
        })
        .catch(err => {
          console.log(err)
          Swal.fire('Errors', `Something went wrong 10`, `error`)
        })
    },
    setUpdateData ({ commit }, payload) {
      return new Promise(function (resolve, reject) {
        axios({
          url: `/products/${payload}`,
          method: 'GET',
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
            Swal.fire('Errors', `Something went wrong 11`, `error`)
          })
      })
    },
    updateProduct ({ commit }, payload) {
      console.log(payload)
      const formData = new FormData()
      formData.set('name', payload.name)
      formData.set('price', payload.price)
      formData.set('stock', payload.stock)
      formData.append('image', payload.image)
      axios({
        url: `/products/${payload.id}`,
        method: 'PUT',
        data: formData,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Product Updated',
            showConfirmButton: false,
            timer: 1500
          })
          router.push('/admin')
        })
        .catch(err => {
          console.log(err)
          Swal.fire('Errors', `Something went wrong 12`, `error`)
        })
    },
    getAdminTransactions ({ commit }) {
      axios({
        url: `/transactions/admin`,
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('setAdminTransactions', data)
        })
        .catch(err => {
          console.log(err)
          Swal.fire('Errors', `Something went wrong 13`, `error`)
        })
    }
  },
  modules: {
  }
})
