import Vuex from 'vuex'
import Vue from 'vue'
import Swal from 'sweetalert2'
import router from '../router/index'
import GetData from '../apis/server'
// import APIongkir from '../apis/apiOngkir'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products:[],
    isLogin : false,
    userRole: false,
    detailProduct : {},
    detailCart : [],
    cartNow : {},
    detailTransaction : false,
    allCities:[],
    allCitiesInProvince:[],
    deliveryCost:0,
    filteredProduct :'',
    allTranscation:[],
    transactionHistory: []
  },
  mutations: {
    FILTER_PRODUCT(state,payload){
      // console.log(payload)
      // router.push('/')
      state.filteredProduct = payload
      let ListOfProducts = this.state.products
      let filteredProduct = []
      return ListOfProducts.filter(product => {
        if(product.name.toString().toLowerCase().includes(payload.toLowerCase())){
          filteredProduct.push(product)
        }
        state.filteredProduct = filteredProduct
        // console.log(state.products,'from filter',payload)
      })

    },
    FETCH_PRODUCT(state,payload){
      state.products = payload
      state.filteredProduct = payload
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
      state.allCities =payload
    },
    GET_PROVINCE(state,payload){
      state.allCitiesInProvince =payload
      // console.log(state.allCitiesInProvince)
    },
    DETAIL_TRANSACTION(state,payload){
      state.detailTransaction = payload
      setTimeout(() => {
        state.detailTransaction  = false
      },4000)
    },
    GET_DELIVERY_COST(state,payload){
      state.deliveryCost = payload
      console.log(state.deliveryCost)
    },
    GET_ALL_TRANSACTION(state,payload){
      state.allTranscation = payload
    },
    GET_TRANSACTION_HISTORY(state,payload){
      state.transactionHistory = payload
    },
    CLEAR_TRANSACTION_HISTORY(state){
      state.detailCart = []
      state.deliveryCost = 0
    },
    ADD_PRODUCT(state,payload){
      state.product.push(payload)
    }
  },
  actions: {
    editProduct({commit},payload){
      console.log(commit,payload)
      GetData({
        method: 'put',
        url : `/products/${payload.productId}`,
        headers : {
          token : localStorage.getItem('token')
        },
        data : {
          name : payload.name,
          description : payload.description,
          price : payload.price
        }
      })
      .then(({data}) => {
        console.log(data)
        Swal.fire(
          `Successfully updated`,
          'Data will be updated soon',
          'success'
          )
          this.dispatch('fetchProduct')
        })
      .catch(({response}) =>{
        console.log(response)
      })
    },
    removeItem({commit},payload){
      console.log(commit)
      Swal.fire({
        title: 'Remove this transaction?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove it!'
        
      }).then((result) => {

      if (result.value) {
        GetData({
          method: 'delete',
          url : `/products/${payload}`,
          headers : {
            token : localStorage.getItem('token')
          },
        })
        .then(({data}) => {
          console.log(data)
          this.dispatch('fetchProduct')
          Swal.fire(
            `Successfully removed`,
            'Data will be updated soon',
            'success'
          )
        })
        .catch(({response}) =>{
          console.log(response)
        })
      }
    })
  },
    addStock({commit},payload){
      console.log(commit)
      GetData({
        method: 'post',
        url : `/stocks/${payload.productId}`,
        headers : {
          token : localStorage.getItem('token')
        },
        data : {
          number : payload.number,
          stock: payload.stock
        }
      })
      .then(({data}) => {
        console.log(data)
        Swal.fire(
          `Success`,
          'Data will be updated soon',
          'success'
        )
      })
      this.dispatch('fetchProduct')
      .catch(({response}) =>{
        console.log(response)
      })
    },
    addProduct({commit},payload){
      GetData({
        method: 'post',
        url : `/products/`,
        headers : {
          token : localStorage.getItem('token')
        },
        data : payload
      })
      .then(({data}) => {
        commit('ADD_PRODUCT',data)
        Swal.fire(
          `Success`,
          'Successfully add the product',
          'success'
        )
          // commit('GET_TRANSACTION_HISTORY',data)
      })
      .catch(({response}) =>{
        console.log(response)
      })
    },
    deleteTransaction({commit},payload){
      Swal.fire({
        title: 'Remove this transaction?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove it!'

      }).then((result) => {

      if (result.value) {
        GetData({
          method: 'delete',
          url : `/transactions/${payload}`,
          headers : {
            token : localStorage.getItem('token')
          },
        })
        .then(({data}) => {
          Swal.fire(
            `${data.message}`,
            'Item has been removed from your cart',
            'success'
          )
          console.log(commit)
          this.dispatch('getAllTransaction')
          this.dispatch('getTransactionHistory')
        })
        .catch(({response}) =>{
          console.log(response)
        })

      }
    })
    },
    confirmReceived({commit},payload){
      
      GetData({
        method: 'get',
        url : `/transactions/confirm/${payload}`,
        headers : {
          token : localStorage.getItem('token')
        },
      })
      .then(({data}) => {
        console.log(commit)
        Swal.fire(
          `${data.message}`,
          'Thank you for your purchase',
          'success'
        )
        this.dispatch('getTransactionHistory')
      })
      .catch(({response}) =>{
        console.log(response)
      })
    },

    sentItem({commit},payload){
      console.log(payload,'from action')
      GetData({
        method: 'post',
        url : `/transactions/mail`,
        headers : {
          token : localStorage.getItem('token')
        },
        data : {
          transactionId : payload
        }
      })
      .then(({data}) => {
        Swal.fire(
          `${data.message}`,
          'Please confirm when the item arrived',
          'success'
        )
          // commit('GET_TRANSACTION_HISTORY',data)
      })
      .catch(({response}) =>{
        console.log(response)
      })
      console.log(commit,payload,'from action')
    },
    getTransactionHistory({commit}){
      GetData({
        method: 'get',
        url : `/transactions/`,
        headers : {
          token : localStorage.getItem('token')
        },
      })
      .then(({data}) => {
          commit('GET_TRANSACTION_HISTORY',data)
      })
      .catch(({response}) =>{
        console.log(response)
      })
    },
    getAllTransaction({commit}){
      GetData({
        method: 'get',
        url : `/transactions/all`,
        headers : {
          token : localStorage.getItem('token')
        },
      })
      .then(({data}) => {
          commit('GET_ALL_TRANSACTION',data)
      })
      .catch(({response}) =>{
        console.log(response)
      })
    },
    createTransaction({commit},payload){
      // console.log(this.state.deliveryCost)
      Swal.fire({
        title: 'Before checkout',
        text: "Make sure all the information are correct",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm'
      }).then((result) => {
        if (result.value) {
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
              postalCode: payload.postalCode,
              // deliveryCost : this.state.deliveryCost
            }
          })
          .then(({data}) => {
            Swal.fire(
              'Thank you for your purchase!',
              'Please confirm when the item arrived',
              'success'
            )
            console.log(data)
            // console.log('create Transaction Success',data,commit)
            router.push('/')
            this.dispatch('getAllTransaction')
            commit('CLEAR_TRANSACTION_HISTORY')
          })
          .catch(({response}) =>{
            console.log(response)
          })
        }
      })
      
    },

    calculateCost({commit},payload){
      let count = 0
      for (let i = 0 ; i < this.state.detailCart.length; i++){
        count += this.state.detailCart[i].count
      }
      let weight = count*1.5*1000
      GetData({
        method: 'post',
        url : `/transactions/getCost`,
        data : {
          city : payload,
          weight: weight
        }
      })
      .then(({data}) => {
        // console.log(data)
        // console.log(data[0].costs[0].cost[0].value,'-----')
        commit('GET_DELIVERY_COST',data[0].costs[0].cost[0].value)
      })
      .catch(({response}) =>{
        console.log(response)
      })
    },

    getCity({commit}){
      GetData({
        method: 'get',
        url : `/transactions/cities`,
      })
      .then(({data}) => {
        commit('GET_CITY',data)
      })
      .catch(({response}) =>{
        console.log(response)
      })
    },

    getCityDetail({commit},payload){
      // console.log(commit)
      console.log(payload,'from get city detail')
      GetData({
        method: 'post',
        url : `/transactions/cityDetails`,
        data : {
          province : payload
        }
      })
      .then(({data}) => {
        console.log('masuk kah?')
        commit('GET_PROVINCE',data)
      })
      .catch(({response}) =>{
        console.log(response)
      })
    },

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
        
        if (result.value) {
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
            Swal.fire(
              'Removed!',
              'Item has been removed from your cart',
              'success'
            )
          })
          .catch(({response}) =>{
            console.log(response)
          })
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
        commit('DETAIL_TRANSACTION',true)
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
        console.log(data)
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
