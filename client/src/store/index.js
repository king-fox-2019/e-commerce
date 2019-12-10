import Vuex from 'vuex'
import axios from 'axios' 
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products:[],
    isLogin : false,
    userRole: false
  },
  mutations: {
    FETCH_PRODUCT(state,payload){
      state.products = payload
    },
    CHANGE_LOGIN(state,payload){
      state.isLogin = payload
    },
    CHANGE_ROLE(state,payload){
      state.userRole = payload
    }
  },
  actions: {
    fetchProduct(context){
      axios({
        method: 'get',
        url : 'http://localhost:3000/products',
        headers : {
            token : localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        context.commit('FETCH_PRODUCT',data)
      })
      .catch(({response}) => {
        console.log(response)
      })
    },
    login(context,payload){
      axios({
        method: 'post',
        url :'http://localhost:3000/users/signin',
        data : {
          email : payload.email ,
          password : payload.password
        }
      })
      .then(({data})=>{
        localStorage.setItem('token',data.token)
        localStorage.setItem('role',data.role)
        context.commit('CHANGE_LOGIN',true)
        if(data.role === 'admin'){
          context.commit('CHANGE_ROLE',true)
        }
      })
      .catch(({response}) => {
        console.log(response)
      })
    },
    logout(context,payload){
      context.commit('CHANGE_LOGIN',payload)
      context.commit('CHANGE_ROLE',false)
      localStorage.removeItem('token')
      localStorage.removeItem('role')
    }
  },
  modules: {
  }
})
