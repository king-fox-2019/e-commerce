import Vuex from 'vuex'
import Vue from 'vue'
import GetData from '../apis/server'
// import APIongkir from '../apis/apiOngkir'
import Swal from 'sweetalert2'
import router from '../router/index'

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
    },
    GET_CITY(state,payload){
      state.cartNow =payload
    }
  },
  actions: {
    createTransaction({commit},payload){
      GetData({
        method: 'post',
        url : `/transactions/checkout`,
        headers : {
          token : localStorage.getItem('token')
        },
        data: {
          receiver: payload.firstName+' '+payload.lastName ,
          street: payload.street,
          city: payload.city,
          province: payload.province,
          postalCode: payload.postalCode
        }
      })
      .then(({data}) => {
        Swal.fire(
          'Thank you for your purchase!',
          'Please confirm when the item arrived',
          'success'
        )
        console.log('create Transaction Success',data,commit)
        router.push('/')
      })
      .catch(({response}) =>{
        console.log(response)
      })
    },
    // getCity({commit}){
      // console.log(process.env.VUE_APP_APIKEY)
      // console.log(process.env.VUE_APP_RAJAONGKIR_API_KEY,'----')
    //   APIongkir({
    //     method: 'get',
    //     url : `/city/`,
    //     headers : {
    //       key : 'fabd964c98d58b14d275f0ae37234817',
    //       'Access-Control-Allow-Origin': '*',
    //       "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    //       'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
    //     },
    //     withCredentials: true,
    //     useCredentails: true,

    //   })
    //   .then(({data}) => {
    //     console.log('data city => ',data)
    //     commit('GET_CITY',data)
    //   })
    //   .catch(({response}) =>{
    //     console.log(response)
    //   })
    // },

    removeTransaction({commit},payload){
      console.log(commit)
      Swal.fire({
        title: 'Remove this from cart?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove it!'

      }).then((result) => {

        GetData({
          method: 'delete',
          url : `/transactions/${payload}`,
          headers : {
            token : localStorage.getItem('token')
          },
        })
        .then(({data}) => {
          console.log('delete success',data)
          this.dispatch('getCart')
        })
        .catch(({response}) =>{
          console.log(response)
        })
        
        if (result.value) {
          Swal.fire(
            'Removed!',
            'Item has been removed from your cart',
            'success'
          )
        }
      })
    },

    addToCart({commit},payload){
  
      GetData({
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
        Swal.fire(
          'added to cart!',
          '',
          'success'
        )
        commit('ADD_CART',data.cart)
        commit('CART_NOW',data.stock)
      })
      .catch(({response}) =>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${response.data.message}`,
        })
        console.log(response.data)
      })
    },

    getCart(context){
      GetData({
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
      GetData({
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
      GetData({
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
      GetData({
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
      await GetData({
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
