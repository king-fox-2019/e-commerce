import server from '@/api/server'

export default {
  state: {
    onSession: false,
    _id: '',
    username: '',
    email: '',
    cart: {},
    transactions: []
  },
  mutations: {
    SET_SESSION(state, session) {
      state.onSession = session
    },
    SET_ID(state, id) {
      state._id = id
    },
    SET_USERNAME(state, username) {
      state.username = username
    },
    SET_EMAIL(state, email) {
      state.email = email
    },
    SET_USER_CART(state, cart) {
      state.cart = cart
    },
    SET_USER_TRANSACTIONS(state, transactions) {
      state.transactions = transactions
    }
  },
  actions: {
    FETCH_USER_DATA({ commit, dispatch }) {
      const access_token = localStorage.getItem('access_token')
      if (access_token) {
        return server
          .get('user/checksession', { headers: { access_token } })
          .then(({ data }) => {
            const user = data.data
            commit('SET_SESSION', true)
            commit('SET_ID', user._id)
            commit('SET_USERNAME', user.username)
            commit('SET_EMAIL', user.email)
            return dispatch('FETCH_USER_CART')
          })
      } else {
        commit('SET_SESSION', false)
        commit('SET_ID', '')
        commit('SET_USERNAME', '')
        commit('SET_EMAIL', '')
      }
    },
    FETCH_USER_CART({ commit }) {
      const access_token = localStorage.getItem('access_token')
      return server
        .get('user/cart', { headers: { access_token } })
        .then(({ data }) => commit('SET_USER_CART', data.data))
    },
    ON_SIGN_UP({ dispatch }, payload) {
      return server.post('/signup', payload).then(response => {
        localStorage.setItem('access_token', response.data.data.access_token)
        return dispatch('FETCH_USER_DATA').then(() => response)
      })
    },
    ON_SIGN_IN({ dispatch }, payload) {
      return server.post('/signin', payload).then(response => {
        localStorage.setItem('access_token', response.data.data.access_token)
        return dispatch('FETCH_USER_DATA').then(() => response)
      })
    },
    ON_SIGN_OUT({ dispatch }) {
      localStorage.clear()
      dispatch('FETCH_USER_DATA')
    },
    UPDATE_CART(context, payload) {
      const access_token = localStorage.getItem('access_token')
      return server
        .patch('user/cart', { ...payload }, { headers: { access_token } })
        .then(response => {
          context.dispatch('FETCH_USER_CART')
          return response
        })
    },
    CHECKOUT_TRANSACTION(context) {
      const access_token = localStorage.getItem('access_token')
      return server
        .post('user/transactions', {}, { headers: { access_token } })
        .then(response => {
          context.dispatch('FETCH_USER_CART')
          return response
        })
    },
    FETCH_USER_TRANSACTIONS({ commit }) {
      const access_token = localStorage.getItem('access_token')
      server
        .get('/user/transactions', { headers: { access_token } })
        .then(({ data }) => {
          commit('SET_USER_TRANSACTIONS', data.data)
        })
    }
  }
}
