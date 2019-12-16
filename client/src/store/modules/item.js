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
    fetchItem: []
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
      console.log("===================");
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
    }
  }
};
