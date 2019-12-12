import server from '@/api/server'

export default {
  state: {
    onSession: false,
    _id: '',
    username: '',
    email: ''
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
    }
  },
  actions: {
    FETCH_USER_DATA({ commit }) {
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
          })
      } else {
        commit('SET_SESSION', false)
        commit('SET_ID', '')
        commit('SET_USERNAME', '')
        commit('SET_EMAIL', '')
      }
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
    }
  }
}
