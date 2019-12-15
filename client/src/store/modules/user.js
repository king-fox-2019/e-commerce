import axios from '../../../apis/server'
// import store from '..';

const namespaced = true;

const state = {
   isSignedIn: false,
   cart: []
}

const mutations = {
   CHANGE_IS_SIGNED_IN(state, authState) {
      state.isSignedIn = authState
   }
}

const actions = {
   fillCart({commit}) {
      // const axiosResponse = await axios({})
      
   },

   checkSignedIn({commit}) {
      if(localStorage.getItem('access_token') !== null) {
         commit('CHANGE_IS_SIGNED_IN', true)
      }
      else commit('CHANGE_IS_SIGNED_IN', false)
   },
}

const getters = {
   userAuthState: (state) => state.isSignedIn,
   
   userCart: (state) => state.cart
}


export default {
   namespaced,
   state,
   mutations,
   actions,
   getters
}


