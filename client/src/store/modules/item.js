import axios from "../../../api/axios";

export default {
  namespaced: true,
  state: {
    item: {
      name: "",
      stock: 0,
      category: "",
      price: 0,
      image: ""
    },
    fetchItem: [],
    detailItem: {}
  },
  getters: {
    fetchItem: state => state.fetchItem
  },
  mutations: {
    CREATE_ITEM(state, payload) {
      state.item = payload;
    },
    FETCH_ITEM(state, payload) {
      state.fetchItem = payload;
    },
    DETAIL_ITEM(state, payload) {
      state.detailItem = payload;
    }
  },
  actions: {
    createItem({ commit }, payload) {
      let token = localStorage.getItem("token");
      return new Promise((resolve, reject) => {
        axios({
          method: "POST",
          url: "/items/",
          data: payload,
          headers: {
            token
          }
        })
          .then(({ data }) => {
            commit("CREATE_ITEM", data.response);
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    fetchItem({ commit }) {
      let token = localStorage.getItem("token");
      axios({
        method: "GET",
        url: `/items/`,
        headers: {
          token
        }
      })
        .then(({ data }) => {
          commit("FETCH_ITEM", data);
        })
        .catch(console.log);
    },
    deleteItem({ dispatch }, payload) {
      let token = localStorage.getItem("token");
      axios({
        method: "DELETE",
        url: `/items/${payload}`,
        headers: {
          token
        }
      })
        .then(({ data }) => {
          dispatch("fetchItem");
        })
        .catch(err => {
          console.log(err);
        });
    },
    detailItem({ commit }, payload) {
      let token = localStorage.getItem("token");
      return new Promise((resolve, reject) => {
        axios({
          method: "GET",
          url: `/items/detail/${payload}`,
          headers: {
            token
          }
        })
          .then(({ data }) => {
            commit("DETAIL_ITEM", data);
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    updateItem({ dispatch }, payload) {
      let token = localStorage.getItem("token");
      return new Promise((resolve, reject) => {
        axios({
          method: "PUT",
          url: `/items/${payload.id}`,
          data: payload.data,
          headers: {
            token
          }
        })
          .then(({ data }) => {
            dispatch("fetchItem");
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
};
