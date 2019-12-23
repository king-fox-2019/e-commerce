import axios from "../../../api/axios";

export default {
  namespaced: true,
  state: {
    isLogin: false,
    userLogin: {
      email: "",
      password: ""
    },
    userSignup: {
      name: "",
      email: "",
      password: ""
    },
    infoUser: {
      name: "No User Login",
      cash: "?",
      role: ""
    }
  },
  getters: {
    isLogin: state => state.isLogin,
    infoUser: state => state.infoUser
  },
  mutations: {
    CHANGE_STATUS_LOGIN(state, payload) {
      state.isLogin = payload;
    },
    USER_LOGIN(state, payload) {
      state.userLogin.email = payload.email;
      state.userLogin.password = payload.password;
    },
    USER_SIGNUP(state, payload) {
      state.userSignup.name = payload.name;
      state.userSignup.email = payload.email;
      state.userSignup.password = payload.password;
    },
    SET_INFO_USER(state, payload) {
      state.infoUser.name = payload.name;
      state.infoUser.cash = payload.cash;
      state.infoUser.role = payload.role;
    },
    ADD_CASH(state, payload) {
      state.infoUser.cash = payload;
    }
  },
  actions: {
    userLogin({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        commit("USER_LOGIN", payload);
        axios({
          method: "POST",
          url: "/users/login",
          data: {
            email: state.userLogin.email,
            password: state.userLogin.password
          }
        })
          .then(({ data }) => {
            commit("CHANGE_STATUS_LOGIN", true);
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    userSignup({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        commit("USER_SIGNUP", payload);
        axios({
          method: "POST",
          url: "/users/signup",
          data: {
            name: state.userSignup.name,
            email: state.userSignup.email,
            password: state.userSignup.password
          }
        })
          .then(({ data }) => {
            commit("CHANGE_STATUS_LOGIN", true);
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    getInfoUser({ commit }) {
      if (localStorage.getItem("token")) {
        let token = localStorage.getItem("token");
        axios({
          method: "GET",
          url: "/users/",
          headers: {
            token
          }
        })
          .then(({ data }) => {
            commit("SET_INFO_USER", data);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        let payload = {
          name: "No User Login",
          cash: "?",
          role: ""
        };
        commit("SET_INFO_USER", payload);
      }
    },
    addCash({ commit, state }, payload) {
      let token = localStorage.getItem("token");
      let newCash = Number(state.infoUser.cash) + Number(payload);
      return new Promise((resolve, reject) => {
        axios({
          method: "PATCH",
          url: "/users/",
          data: {
            cash: newCash
          },
          headers: {
            token
          }
        })
          .then(({ data }) => {
            commit("ADD_CASH", data.cash);
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
};
