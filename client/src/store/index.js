import Vue from 'vue'
import Vuex from 'vuex'
import product from './modules/product'
import cart from './modules/cart'
import transaction from './modules/transaction'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    isLoading: false,
    isSuccess: false,
    admin: false
  },
  mutations: {
    login(state){
      state.isLogin=true
    },
    logout(state){
      state.isLogin=false
    },
    SET_ADMIN_TRUE(state){
      state.admin=true
    }
  },
  actions: {
    login({commit}){
      commit('login')
    },
    logout({commit}){
      console.log('masuk sini')
      localStorage.removeItem("access_token")
      commit('logout')
    },
    setAdmin({commit}){
      commit('SET_ADMIN_TRUE')
    }
  },
  getters: {
    getAdmin: state => {
      return state.admin
    }
  },
  modules: {
    product,
    cart,
    transaction
  }
})
