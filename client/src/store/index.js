import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './userModule'

const server = require('../api/server')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: []
  },
  mutations: {
    SET_ITEMS(state, items) {
      state.items = items
    }
  },
  actions: {
    FETCH_ITEMS(context) {
      return server.get('items').then(({ data }) => {
        context.commit('SET_ITEMS', data.data)
      })
    },
    GET_ITEM_DETAIL(context, id) {
      return server.get(`items/${id}`)
    },
    GET_TRANSACTION_DETAIL(context, id) {
      const access_token = localStorage.getItem('access_token')
      return server.get(`transactions/${id}`, { headers: { access_token } })
    }
  },
  modules: { user: userModule }
})
