import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../server';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: [],
    emasBatang: [],
    emasSeries: [],
  },
  mutations: {
    SET_DATA(state, payload) {
      state.data = payload;
    },
    SET_BATANG(state, payload) {
      state.emasBatang = payload;
    },
    SET_SERIES(state, payload) {
      state.emasSeries = payload;
    },
  },
  actions: {
    fetchData({ commit }) {
      axios.get('items')
        .then(({ data }) => {
          commit('SET_DATA', data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    fetchDataBatang({ commit }) {
      axios.get('items/eb')
        .then(({ data }) => {
          commit('SET_BATANG', data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    fetchDataSeries({ commit }) {
      axios.get('items/sb')
        .then(({ data }) => {
          commit('SET_SERIES', data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
  modules: {
  },
});
