import axios from 'axios'


 const state = {
      products : []
  }
 const mutations = {
    fillItem(state,payload){
        state.products = payload
    }  
  }
  const actions = {
    fetchAction(context) {
        axios.get('http://localhost:3000/items')
        .then(({data})=>{
            context.commit('fillItem',data)
        })
        .catch(err=>{
            console.log(err)
        })
    }
  }
  const getters = {
      getProducts : (state) => {
        return  state.products
      }
  }

  export default {
      namespaced: true,
      state,
      mutations,
      actions,
      getters
  }
