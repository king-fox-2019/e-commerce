import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../../apis/axios'
import router from '../router'
import Swal from 'sweetalert2'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    name: '',
    email: '',
    money: 0,
    image: '',
    role: '',
    listItem: [],
    stockTotal: [],
    mycart: []
  },
  mutations: {
    ON_CART (state,payload) {
      state.mycart = payload.data
    },
    ON_LOGIN (state, payload) {
      state.isLogin = true
      state.name = payload.name
      state.email = payload.email
      state.money = Number(payload.money)
      state.image = payload.image
      state.role = payload.role
      if (payload.role === 'admin') {
        Swal.close()
        router.push('/admin')
      } else {
        Swal.close()
        router.push('/')
      }
    },
    ON_LOGOUT (state) {
      state.isLogin = false
      state.name = ''
      state.email = ''
      state.money = ''
      state.image = ''
      state.role = ''
      state.mycart = []
    },
    CHANGE_ITEMS(state, payload){
      console.log('dari vuex', payload);
      state.listItem = payload.data
      state.stockTotal = payload.stock
    }
  },
  actions: {
    getMyCart ({ commit }) {
      Swal.showLoading()
      axios({
        url: '/cart',
        method: 'GET',
        headers:{
          'token': localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        commit('ON_CART', {
          data
        })
        Swal.close()
      })
      .catch(error => {
        console.log(error)
      })
    },
    getAccount ({ commit }) {
      Swal.showLoading()
      axios({
        url: 'user/logged/' + localStorage.getItem('email'),
        method: 'GET'
      })
      .then(({ data }) => {
        commit('ON_LOGIN', {
          name: data.account.name,
          email: data.account.email,
          money: data.account.money,
          image: data.account.image,
          role: data.account.role
        })
      })
      .catch(error => {
        console.log(error)
      })
    },
    getListItem ({ commit }) {
      Swal.showLoading()
      axios({
        url: 'product/',
        method: 'GET'
      })
      .then(({ data }) => {
        let stock = []
        data.forEach(product=>{
          let total = 0
          product.size.forEach(size=>{
            total += size.stock
          })
          stock.push(total)
        })
        commit('CHANGE_ITEMS', {data, stock})
        Swal.close()
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
  modules: {
  }
})
