import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    test:'test hayoloh',
    isLogin:false,
    role: null,
    dataProduct: [],
    userCart: []
    
  },
  mutations: {
    SET_IS_LOGIN(state,payload)
      {
        state.isLogin = payload
        console.log("TCL: state.isLogin @store/index", state.isLogin)
      },
    SET_ROLE(state,payload)
      {
        state.role = payload
        console.log("TCL: state.role @store/index", state.role)
      },
    SET_DATA_PRODUCT(state,payload)
      {
        state.dataProduct = payload
        console.log("TCL: state.dataProduct @store/index", state.dataProduct)
      },
    SET_USER_CART(state,payload)
      {
        state.userCart = payload
        console.log("TCL: state.userCart @store/index", state.userCart)
      }

  },
  actions: {
    setIsLogin({commit,state}, payload)
      {
        console.log('TCL \n============\n ', 'jalan nih dispatch setIsLogin')
        if ( localStorage.getItem('access_token')){
            commit('SET_IS_LOGIN', true)
          }
        else {
            commit('SET_IS_LOGIN', false)
          }
      },
    fetchingData({commit,state}, payload)
      {
        console.log('TCL \n============\n @store/index/fetchingData', 'jalan nih fetching data')
        axios({
          method: 'get',
          url: 'http://localhost:3000/products'
        })
        .then(result=>{
          console.log("TCL: result", result)
          commit('SET_DATA_PRODUCT', result.data)
        })
        .catch(err=>{
          console.log('TCL \n============\n ', err)
          console.log('TCL \n============\n err, from store/index/fetchingData', err.response)
        })
      }

      
    
  },
  getters:{
    isLogin: state=>{
      return state.isLogin
    },
    role: state=>{
      return state.role
    },
    dataProduct: state=>{
      return state.dataProduct
    },
    userCart: state=>{
      return state.userCart
    }
  }
})
