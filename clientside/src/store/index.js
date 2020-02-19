import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    productList : [],
    userCart : {}
  },
  mutations: {
    fetchProduct(state, payload){
      state.productList = payload
    },
    fetchCart(state, payload){
      state.userCart = payload
    }
  },
  actions: {
    fetchProduct({ state, commit }, payload){  
      axios({
        method:'get',
        url:'http://localhost:3000/product',
        headers:{
          access_token : localStorage.access_token
        }
      }).then(({data}) => {
        commit('fetchProduct', data)
      }).catch(console.log())
    },
    fetchCart({ state, commit }, payload){  
      axios({
        method:'get',
        url:'http://localhost:3000/user',
        headers:{
          access_token : localStorage.access_token
        }
      }).then(({data}) => {
        commit('fetchCart', data)
      }).catch(console.log())
    },

  },
  modules: {
  }

})
