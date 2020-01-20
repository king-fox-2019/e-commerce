import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../../apis/server'
import Swal from 'sweetalert2'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isSignedIn: false,
    products: []
  },
  mutations: {
    isSignedIn(state, payload) {
      state.isSignedIn = payload
    },
    setProducts(state, payload) {
      console.log(payload)
      state.products = payload
    }
  },
  actions: {
    isSignedIn(context, payload) {
      axios.post('user/signin', payload)
      .then(({ data }) => {
        localStorage.setItem('access_token', data.access_token)
        context.commit('isSignedIn', true)
          Swal.fire({
            icon: 'success',
            text: 'Successfully signed in!'
          })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops..',
            text: 'Invalid email/password'
          })
        })
    },
    signUp(context, payload) {
      axios.post('/user/signup', payload)
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          context.commit('isSignedIn', true)
          Swal.fire({
            icon: 'success',
            text: 'Successfully registered!'
          })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops..',
            text: 'Username/email has already been registered'
          })
        })
    },
    signOut(context) {
      Swal.fire({
        title: 'Sign out',
        text: "Are you sure that you want to sign out?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, sign me out'
      })
        .then((result) => {
        if (result.value) {
          localStorage.removeItem('access_token')
          context.commit('isSignedIn', false)
          router.push('/')
          Swal.fire({
            icon: 'success',
            text: 'You are now signed out'
          })
        }
      })
    },
    fetchProducts(context) {
      axios({
				method: 'get',
				url: '/products'
			})
				.then(({ data }) => {
					context.commit('setProducts', data)
				})
				.catch(err => {
					console.log(err)
				})
    }
  }
})