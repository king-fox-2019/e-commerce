import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/api'
import router from '../router/index'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    username: '',
    isAdmin: false,
    products: [],
    cart: [],
    transactions: [],
    adminTransactions: []
  },
  mutations: {
    IS_LOGIN(state, payload) {
      // console.log(payload, "is_login");

      state.isLogin = payload
    },
    ADMIN(state, payload) {
      // console.log(payload, 'masuk admin')
      state.isAdmin = payload
    },
    USERNAME(state, payload) {
      state.username = ''
    },
    // LOGIN(state, payload) {
    //   console.log(payload);
    //   state.isLogin = true
    //   state.username = payload.user.username
    //   state.isAdmin = payload.user.isAdmin
    //   // console.log(payload);
    // },
    FETCH_PRODUCTS(state, payload) {
      state.products = payload
    },
    SET_CART(state, payload) {
      state.cart = payload
      // console.log(state.cart);
    },
    SET_TRANSACTIONS(state, payload) {
      state.transactions = payload
    },
    SET_ADMIN_TRANSACTION(state, payload) {
      state.adminTransactions = payload
    }
  },
  actions: {
    login(context, payload) {
      // console.log(payload, "ini dari store")
      return new Promise(function (resolve, reject) {
        return axios({
          method: 'POST',
          url: `/user/login`,
          data: {
            email: payload.email,
            password: payload.password
          }
        })
          .then(({ data }) => {
            // console.log('asas', data);


            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.user.id);
            localStorage.setItem("username", data.user.username);
            localStorage.setItem("isAdmin", Boolean(data.user.isAdmin));
            context.commit('SET_CART', data.user.cart)

            // Swal.fire("Logged in", "Have a nice day", "success")
            context.commit("IS_LOGIN", true);
            if (data.user.isAdmin === true || data.user.isAdmin === "true") {
              // console.log(data.user.isAdmin, 'masuuuk')
              context.commit('ADMIN', true)
            }
            resolve()
          })
          .catch(err => {
            // console.log(`err`, err.response);
            reject(err)
            Swal.fire('Errors', `${err.response.data.message}`, `error`)
          })
      })
    },
    register(context, payload) {
      // console.log(payload)
      return new Promise(function (resolve, reject) {
        axios({
          method: 'POST',
          url: `/user/register`,
          data: {
            username: payload.username,
            email: payload.email,
            password: payload.password
          }
        })
          .then(({ data }) => {
            resolve()
            // console.log(`masuk yeay store`);
          })
          .catch(err => {
            // console.log(`err store`, err.response);
            Swal.fire('Errors', `${err.response.data.message}`, `error`)
            reject(err)
          })
      })
    },
    fetchProducts(context) {
      axios({
        url: `/products`,
        method: 'GET'
      })
        .then(({ data }) => {
          context.commit('FETCH_PRODUCTS', data)
        })
    },
    singleProduct(context, payload) {
      // console.log(payload)
      return new Promise(function (resolve, reject) {
        axios({
          url: `/products/${payload}`,
          method: 'GET'
        })
          .then(({ data }) => {
            // console.log(data, "views");
            resolve(data);
          })
          .catch(err => {
            Swal.fire('Errors', `${err.response.data.message}`, `error`)
            // console.log(err.response, "=================");
            reject(err)
          });
      })
    },
    addToCart(context, payload) {
      return new Promise(function (resolve, reject) {
        // console.log(payload, "index store")
        axios({
          url: `/user/cart`,
          method: 'PATCH',
          data: {
            product_id: payload._id,
            product_name: payload.name,
            product_price: payload.price,
            product_stock: payload.stock,
            product_image: payload.image,
            quantity: payload.quantity
          },
          headers: {
            token: localStorage.getItem('token')
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
    viewCart(context, payload) {
      return new Promise(function (resolve, reject) {
        axios({
          url: `/user/cart`,
          method: 'GET',
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            // console.log(data, " ====== ini cart dari store")
            context.commit('SET_CART', data)
            resolve(data)
          })
          .catch(err => {
            Swal.fire('Errors', `${err.response.data.message}`, `error`)
            reject(err)
          })
      })

    },
    subtractFromCart({ dispatch }, payload) {
      return new Promise(function (resolve, reject) {
        axios({
          url: `/user/cart/subtract`,
          method: 'PATCH',
          data: {
            product_id: payload
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            resolve(data)
            dispatch('viewCart')
          })
          .catch(err => {
            reject(err)
            // console.log(err)
            Swal.fire('Errors', `${err.response.data.message}`, `error`)
          })
      })
    },
    addFromCart({ dispatch }, payload) {
      return new Promise(function (resolve, reject) {
        axios({
          url: `/user/cart`,
          method: 'PATCH',
          data: {
            product_id: payload._id,
            quantity: payload.quantity
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            resolve(data)

            dispatch('viewCart')
          })
          .catch(err => {
            reject(err)

            // console.log(err)
            Swal.fire('Errors', `${err.response.data.message}`, `error`)
          })
      })
    },
    removeFromCart({ commit }, payload) {
      let id = payload
      // console.log(id);
      return new Promise(function (resolve, reject) {
        axios({
          url: `/user/cart/${id}`,
          method: 'PATCH',
          headers: {
            token: localStorage.getItem('token')
          },
          data: {
            id: payload
          }
        })
          .then(({ data }) => {
            resolve()
          })
          .catch(err => {
            Swal.fire('Errors', `${err.response.data.message}`, `error`)
            reject(err)
          })
      })
    },
    createTransaction({ dispatch }) {
      axios({
        url: `/transactions`,
        method: 'POST',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          dispatch('getUserTransactions')
          Swal.fire(
            "Thankyou",
            "Your order is being packed and will be shipped tomorrow",
            "success"
          );
          router.push('/transaction')
        })
        .catch(err => {
          // console.log(err)
          Swal.fire('Errors', `${err.response.data.message}`, `error`)
        })
    },
    getUserTransactions({ commit }) {
      axios({
        url: `/transactions`,
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_TRANSACTIONS', data)
        })
        .catch(err => {
          // console.log(err)
          Swal.fire('Errors', `${err.response.data.message}`, `error`)
        })
    },
    confirmTransaction({ dispatch }, payload) {
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
          // console.log(err)
          Swal.fire('Errors', `${err.response.data.message}`, `error`)
        })
    },
    addProduct(context, payload) {
      // console.log(payload, '------------ index store')
      return new Promise(function (resolve, reject) {
        axios({
          method: 'POST',
          url: `/products`,
          headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data"
          },
          data: payload
        })
          .then(({ data }) => {
            // console.log('asas', data);
            resolve()
          })
          .catch(err => {
            Swal.fire('Errors', `${err.response.data.message}`, `error`)
            // console.log(`err`, err.response);
            reject(err.response)
          })
      })
    },
    deleteProduct(context, payload) {
      // console.log(localStorage.getItem("token"));
      // console.log(payload);

      return new Promise(function (resolve, reject) {
        axios({
          method: 'DELETE',
          url: `/products/${payload}`,
          headers: {
            token: localStorage.getItem("token")
          }
        })
          .then(({ data }) => {
            // console.log(data, 'masuk');
            resolve(data)
          })
          .catch(err => {
            Swal.fire('Errors', `${err.response.data.message}`, `error`)
            reject(err)
          })
      })
    },
    setDataUpdate({ commit }, payload) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'GET',
          url: `/products/${payload}`
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            Swal.fire('Errors', `${err.response.data.message}`, `error`)
            reject(err)
          })
      })
    },
    updateProduct({ commit }, { payload, id }) {
      return new Promise(function (resolve, reject) {
        // console.log(payload, id, '------------ index store')
        axios({
          method: 'PATCH',
          url: `/products/${id}`,
          headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data"
          },
          data: payload
        })
          .then(({ data }) => {
            resolve()
            // Swal.fire({
            //   icon: 'success',
            //   title: 'Product Updated',
            //   showConfirmButton: false,
            //   timer: 1500
            // })
            this.$router.push('/admin')
          })
          .catch(err => {
            Swal.fire('Errors', `${err.response.data.message}`, `error`)
            reject(err)
            // console.log(err)
            // Swal.fire('Errors', `Something went wrong`, `error`)
          })
      })
    },
    getAdminTransactions({ commit }) {
      axios({
        url: `/transactions/admin`,
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_ADMIN_TRANSACTION', data)
        })
        .catch(err => {
          // console.log(err)
          Swal.fire('Errors', `${err.response.data.message}`, `error`)
        })
    },
    auth({ commit }) {
      if (localStorage.getItem('token')) {
        commit('IS_LOGIN', true)
        // commit('LOGIN', {
        //   user: {
        //     username: localStorage.getItem('username'),
        //     isAdmin: localStorage.getItem('isAdmin')
        //   }
        // })
        if (localStorage.getItem('isAdmin') === true || localStorage.getItem('isAdmin') == "true") {
          console.log('masuukkk authhhh')
          commit('ADMIN', true)
        }
      } else {
        commit('IS_LOGIN', false)
      }
    }
  },

  modules: {
  }
})
