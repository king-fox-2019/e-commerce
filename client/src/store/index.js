import Vuex from 'vuex'
import Vue from 'vue'
import axios from '../apis/server'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products:[],
    isLogin : false,
    userRole: false,
    detailProduct : {},
    detailCart : [],
    cartNow : {}
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
    },
    DETAIL_PRODUCT(state,payload){
      state.detailProduct = payload
    },
    DETAIL_CART(state,payload){
      state.detailCart = payload
    },
    ADD_CART(state,payload){
      state.detailCart.push(payload)
    },
    CART_NOW(state,payload){
      state.cartNow =payload
    }
  },
  actions: {

    removeTransaction({commit},payload){
      // console.log(payload)
      axios({
        method: 'delete',
        url : `/transactions/${payload}`,
        headers : {
          token : localStorage.getItem('token')
        },
      })
      .then(({data}) => {
        console.log('delete success')
        this.dispatch('getCart')
      })
      .catch(({response}) =>{
        console.log(response)
      })
    },

    addToCart({commit},payload){
  
      axios({
        method: 'post',
        url : `/products/${payload.id}`,
        headers : {
          token : localStorage.getItem('token')
        },
        data : {
          size : payload.size,
          count : payload.amount
        }
      })
      .then(({data}) => {
        // console.log(data,'dari dari add to cart')
        commit('ADD_CART',data.cart)
        commit('CART_NOW',data.stock)
      })
      .catch(({response}) =>{
        console.log(response)
      })
    },

    getCart(context){
      axios({
        method: 'get',
        url : `/transactions/cart`,
        headers : {
          token : localStorage.getItem('token')
        },
      })
      .then(({data}) => {
        console.log(data)
        context.commit('DETAIL_CART',data)
      })
      .catch(({response}) =>{
        console.log(response)
      })
    },

    productDetail({commit},payload){
      axios({
        method: 'get',
        url : `/products/${payload}`,
      })
      .then(({data}) => {
        commit('DETAIL_PRODUCT',data)
      })
      .catch(({response}) =>{
        console.log(response)
      })
    },
    

    fetchProduct(context){
      axios({
        method: 'get',
        url : '/products',  
      })
      .then(({data}) => {
        context.commit('FETCH_PRODUCT',data)
      })
      .catch(({response}) => {
        console.log(response)
      })
    },
    register(context,payload){
      axios({
        method: 'post',
        url :'/users/signup',
        data : {
          email : payload.email ,
          password : payload.password,
          fullname : payload.fullname
        }
      })
      .then(({data})=>{
        Swal.fire(
          'Success!',
          'now you are signed in!',
          'success'
        )
        localStorage.setItem('token',data.access_token)
        localStorage.setItem('role',data.role)
        context.commit('CHANGE_LOGIN',true)
        if(data.role === 'admin'){
          context.commit('CHANGE_ROLE',true)
        }
      })
      .catch(({response}) => {
         
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Unable to register at the moment',
        })
        console.log(response)
      })
    },
    async login(context,payload){
      await axios({
        method: 'post',
        url :'/users/signin',
        data : {
          email : payload.email ,
          password : payload.password
        }
      })
      .then(({data})=>{
        
        Swal.fire(
          'Success!',
          'now you are signed in!',
          'success'
        )
        localStorage.setItem('token',data.access_token)
        localStorage.setItem('role',data.role)
        // setTimeout(test => {
          // },2000)
          context.commit('CHANGE_LOGIN',true)
          if(data.role === 'admin'){
            context.commit('CHANGE_ROLE',true)
          }
        })
        .catch(({response}) => {
          console.log('wrong username/password')
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Wrong username/password',
          })
          console.log(response)
        })
        this.dispatch('getCart')
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
