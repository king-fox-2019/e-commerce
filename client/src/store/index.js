import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: "",
    access_token: ""
  },
  mutations: {
    UPDATE_USERNAME(state, payload) {
      state.username = payload.username;
    },
    UPDATE_ACCESS_TOKEN(state, payload) {
      state.access_token = payload.access_token;
    }
  },
  actions: {},
  modules: {}
});
