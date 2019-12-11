import Vue from 'vue'
import Vuex from 'vuex'

const server = require('../api/server')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    onSession: false,
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
    }
  },
  modules: {}
})
