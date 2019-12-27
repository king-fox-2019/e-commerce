import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    username: ''
  },
  mutations: {
    login(state, payload){
      state.isLogin = true
      state.username = payload
    },
    logout(state, payload){
      state.isLogin = false
      state.username = ''
    }
  },
  actions: {
  },
  modules: {
  }
})
