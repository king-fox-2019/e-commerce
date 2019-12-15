import server from '@/api/server'

export default {
  state: {
    adminSession: false,
    transactions: []
  },
  mutations: {
    SET_ADMIN_SESSION(state, session) {
      state.adminSession = session
    },
    SET_TRANSACTIONS(state, transactions) {
      state.transactions = transactions
    },
    SET_ITEMS(state, items) {
      state.items = items
    }
  },
  actions: {
    ADMIN_REGISTER({ commit }, payload) {
      return server.post('admin/signup', payload).then(response => {
        commit('SET_ADMIN_SESSION', true)
        localStorage.setItem('access_token', response.data.data.access_token)
        return response
      })
    },
    ADMIN_SIGN_IN({ commit }, payload) {
      return server.post('admin/signin', payload).then(response => {
        commit('SET_ADMIN_SESSION', true)
        localStorage.setItem('access_token', response.data.data.access_token)
        return response
      })
    },
    CHECK_SUPER_ADMIN() {
      return server.get('admin')
    },
    CHECK_SESSION({ commit }) {
      const access_token = localStorage.getItem('access_token')
      // if (access_token)
      return server
        .get('admin/checksession', { headers: { access_token } })
        .then(() => {
          commit('SET_ADMIN_SESSION', true)
        })
      // else return Promise.reject()
    },
    UPLOAD_IMAGE(context, file) {
      const formData = new FormData()
      formData.append('image', file)
      const access_token = localStorage.getItem('access_token')
      return server({
        method: 'post',
        url: 'admin/image',
        data: formData,
        headers: { access_token }
      })
    },
    ADD_ITEM({ dispatch }, payload) {
      const access_token = localStorage.getItem('access_token')
      return server
        .post('admin/items', payload, { headers: { access_token } })
        .then(response => {
          dispatch('FETCH_ITEMS')
          return response
        })
    },
    FETCH_ADMIN_TRANSACTIONS({ commit }) {
      const access_token = localStorage.getItem('access_token')
      return server
        .get('admin/transactions', { headers: { access_token } })
        .then(({ data }) => {
          commit('SET_TRANSACTIONS', data.data)
        })
    },
    MARK_DELIVER({ dispatch }, id) {
      const access_token = localStorage.getItem('access_token')
      return server
        .patch(
          `admin/transactions/${id}`,
          { status: 'delivering' },
          { headers: { access_token } }
        )
        .then(() => dispatch('FETCH_ADMIN_TRANSACTIONS'))
    },
    FETCH_ADMIN_ITEMS({ commit }) {
      const access_token = localStorage.getItem('access_token')
      return server
        .get('admin/items', { headers: { access_token } })
        .then(({ data }) => commit('SET_ITEMS', data.data))
    }
  }
}
