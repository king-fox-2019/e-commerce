import axios from '../../../apis/server'
// import store from '..';

const namespaced = true;

const state = {
   isSignedIn: false,
   user: {
      name: '',
      cart: []
   }
}

const mutations = {
   CHANGE_IS_SIGNED_IN(state, authState) {
      state.isSignedIn = authState
   },

   FILL_USER(state, userData) {
      state.user.name = userData.name
      state.user.cart = userData.cart
   }
}

const actions = {
   fetchUserData({commit}) {
      // const axiosResponse = await axios({})
      axios({
         url: `/buyer`,
         method: `get`,
         headers: {
            access_token: localStorage.getItem('access_token')
         }
      })
      .then(({data}) => {
         console.log('fetch user data success')
         commit('FILL_USER', {
            name: data.name,
            cart: data.cart
         })
      })
      .catch(({response}) => {
         // this.$swal({
         //    type: 'error',
         //    title: 'Fetching user data failed',
         //    text: response.data.message
         // })
      })
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
   
   getUserCart: (state) => state.user.cart,
   getUserName: (state) => state.user.name
}


export default {
   namespaced,
   state,
   mutations,
   actions,
   getters
}


