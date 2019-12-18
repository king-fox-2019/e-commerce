import axios from "../../../api/axios";

export default {
  namespaced: true,
  state: {
    fetchCheckout: []
  },
  getters: {},
  mutations: {
    FETCH_CHECKOUT(state, payload) {
      state.fetchCheckout = payload;
    }
  },
  actions: {
    buyItem({ dispatch }, payload) {
      console.log(payload);
      let token = localStorage.getItem("token");
      return new Promise((resolve, reject) => {
        axios({
          method: "POST",
          url: "/carts",
          data: payload,
          headers: {
            token
          }
        })
          .then(({ data }) => {
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    fetchCheckout({ commit }) {
      let token = localStorage.getItem("token");
      axios({
        method: "GET",
        url: "/carts/",
        headers: {
          token
        }
      }).then(({ data }) => {
        commit("FETCH_CHECKOUT", data);
      });
    },
    removeItem({ dispatch }, payload) {
      let token = localStorage.getItem("token");
      return new Promise((resolve, reject) => {
        axios({
          method: "DELETE",
          url: `/carts/${payload}`,
          headers: {
            token
          }
        })
          .then(({ data }) => {
            dispatch("fetchCheckout");
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    checkout({ dispatch }, payload) {
      let token = localStorage.getItem("token");
      return new Promise((resolve, reject) => {
        axios({
          method: "PATCH",
          url: "/carts/",
          data: {
            cash: payload
          },
          headers: {
            token
          }
        })
          .then(({ data }) => {
            dispatch("fetchCheckout");
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    acceptItem({ dispatch }, payload) {
      let token = localStorage.getItem("token");
      return new Promise((resolve, reject) => {
        axios({
          method: "PATCH",
          url: `/carts/${payload}`,
          headers: {
            token
          }
        })
          .then(({ data }) => {
            dispatch("fetchCheckout");
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
};
