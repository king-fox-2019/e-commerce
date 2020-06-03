import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../server';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: [],
    emasBatang: [],
    emasSeries: [],
    isLogin: false,
    cart: [],
    newcart: [],
  },
  mutations: {
    // set item SEMUA EMAS yang ada di Store, pada saat pemanggilan di Server
    SET_LOGIN(state, payload) {
      state.isLogin = payload;
    },
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
    // set penambahan EMAS CART yang ada di Store, pada saat user proses CART
    SET_NEWCART(state, payload) {
      state.newcart = payload;
    },
    SET_CART(state, payload) {
      state.cart = payload;
    },
    // reset CART yang ada di Store, setelah selesai proses CART
    SET_NULL_CART(state) {
      state.cart = [];
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
    // pemanggilan LOGIN yang ada di server
    login({ commit }, payload) {
      return axios.post('users/login', payload);
    },
    // pemanggilan REGISTER yang ada di server
    register({ commit }, payload) {
      return axios.post('users/register', payload);
    },
    // pemanggilan cart yang ada di server
    fetchCart({ commit }) {
      axios({
        method: 'GET',
        url: 'cart',
        headers: { token: localStorage.getItem('token') },
      })
        .then(({ data }) => {
          commit('SET_NEWCART', data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    // add Cart Item
    addItem({ commit }, payload) {
      const value = {
        item: payload,
      };
      axios({
        method: 'PUT',
        url: 'cart/add',
        data: value,
        headers: { token: localStorage.getItem('token') },
      })
        .then(({ data }) => {
          commit('SET_NEWCART', data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    // delete Cart Item
    deleteItem({ commit }, payload) {
      const value = {
        item: payload,
      };
      return axios({
        method: 'PUT',
        url: 'cart/delete',
        data: value,
        headers: { token: localStorage.getItem('token') },
      })
        .catch((err) => {
          console.log(err.response);
        });
    },
    // checkout Cart Item
    checkout({ commit }) {
      return axios({
        method: 'PUT',
        url: 'cart',
        headers: { token: localStorage.getItem('token') },
      })
        .then(({ data }) => {
          commit('SET_NEWCART', data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
  modules: {
  },
});
