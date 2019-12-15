import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import item from './modules/item'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    page: 'signin'
  },
  mutations: {
    ADD_TO_CART(state, item) {},
    TOGGLE_SIGNED_IN(state) {},
    CHANGE_PAGE(state, pageName) {
      state.page = pageName
    }
  },
  actions: {
  },
  modules: {
    user,
    item
  },
  getters: {
    currentPage: (state) => state.page
  }
})
