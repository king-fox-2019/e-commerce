import axios from "../../../api/axios";

export default {
  namespaced: true,
  state: {
    fetchHistory: []
  },
  getters: {
    showHistory: state => state.showHistory
  },
  mutations: {
    FETCH_HISTORY(state, payload) {
      state.fetchHistory = payload;
    }
  },
  actions: {
    fetchHistory({ commit }) {
      let token = localStorage.getItem("token");
      axios({
        method: "GET",
        url: "/transactions/",
        headers: {
          token
        }
      }).then(({ data }) => {
        commit("FETCH_HISTORY", data);
      });
    }
  }
};
