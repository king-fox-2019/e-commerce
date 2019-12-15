import axios from 'axios'


 const state = {
      cart : null
  }
 const mutations = {
    fillItem(state,payload){
        state.cart = payload
    },
    getNull(state){
        state.cart = null
    }  
  }
  const actions = {
    fetchAction(context) {
        axios({
            url: 'http://localhost:3000/carts',
            method: 'get',
            headers:{
                token: localStorage.getItem("token")
            }
        })
        .then(({data})=>{
            context.commit('fillItem',data)
        })
        .catch(err=>{
            console.log(err)
        })
    }
  }
  const getters = {
      getCart : (state) => {
        return  state.cart
      }
  }

  export default {
      namespaced: true,
      state,
      mutations,
      actions,
      getters
  }