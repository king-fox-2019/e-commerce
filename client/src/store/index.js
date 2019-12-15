import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../server';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: [],
    emasBatang: [],
    emasSeries: [],
    cartEb: [],
    cartEs: [],
  },
  mutations: {
    // set item SEMUA EMAS yang ada di Store, pada saat pemanggilan di Server
    SET_DATA(state, payload) {
      state.data = payload;
    },
    // set item EMAS BATANG yang ada di Store, pada saat pemanggilan di Server
    SET_BATANG(state, payload) {
      state.emasBatang = payload;
    },
    // set item EMAS SERIES yang ada di Store, pada saat pemanggilan di Server
    SET_SERIES(state, payload) {
      state.emasSeries = payload;
    },
    // set penambahan EMAS BATANG CART yang ada di Store, pada saat user proses CART
    SET_CART_EB(state, payload) {
      state.cartEb = payload;
    },
    // set penambahan EMAS SERIES CART yang ada di Store, pada saat user proses CART
    SET_CART_ES(state, payload) {
      state.cartEs = payload;
    },
    // reset CART yang ada di Store, setelah selesai proses CART
    SET_NULL_CART(state) {
      state.cartEb = [];
      state.cartEs = [];
    },
  },
  actions: {
    // pemanggilan item SEMUA EMAS yang ada di server
    fetchData({ commit }) {
      axios.get('items')
        .then(({ data }) => {
          commit('SET_DATA', data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    // pemanggilan item EMAS BATANG yang ada di server
    fetchDataBatang({ commit }) {
      axios.get('items/eb')
        .then(({ data }) => {
          commit('SET_BATANG', data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    // pemanggilan item EMAS SERIES yang ada di server
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
