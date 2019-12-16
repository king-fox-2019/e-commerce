import Vue from "vue";
import Vuex from "vuex";
import serverAPI from "../../config/serverAPI";
import { rejects } from "assert";
// import Swal from 'sweetalert2'
// import { rejects } from 'assert'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    currentProduct: {},
    onSession: false,
    cart: {}
  },
  mutations: {
    SET_PRODUCTS(state, payload) {
      state.products = payload;
    },
    SET_CURRENT_PRODUCT(state, payload) {
      state.currentProduct = payload;
    },
    SET_SESSION(state, payload) {
      state.onSession = payload;
    },
    SET_CURRENT_CART(state, payload) {
      state.cart = payload;
    }
  },
  actions: {
    signinUser(context, payload) {
      const data = {
        email: payload.email,
        password: payload.password
      };
      return new Promise((resolve, reject) => {
        serverAPI({
          url: "/users/signin",
          method: "POST",
          data
        })
          .then(({ data }) => {
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    signupUser({ commit, state }, payload) {
      const data = {
        name: payload.name,
        email: payload.email,
        password: payload.password
      };
      return new Promise((resolve, reject) => {
        serverAPI({
          url: "/users/signup",
          method: "POST",
          data
        })
          .then(({ data }) => {
            resolve(data);
          })
          .catch(err => {
            reject(err);
            console.log(err);
          });
      });
    },
    changeStatusUser({ state, commit, dispatch }, payload) {
      const accessToken = localStorage.getItem("access_token");
      const headers = {
        access_token: accessToken
      };
      const data = {
        password: payload.password
      };
      return new Promise((resolve, reject) => {
        serverAPI({
          method: "PATCH",
          url: "/users/becomeaseller",
          headers,
          data
        })
          .then(({ data }) => {
            resolve(data);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      });
    },
    updateCart({ state, commit, dispatch }, payload) {
      const accessToken = localStorage.getItem("access_token");
      const headers = {
        access_token: accessToken
      };
      const { item, qty, command } = payload;
      const data = {
        item,
        qty,
        command
      };
      return new Promise((resolve, reject) => {
        serverAPI({
          method: "PATCH",
          url: "/cart",
          headers,
          data
        })
          .then(({ data }) => {
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    createCart({ state, commit }) {
      const accessToken = localStorage.getItem("access_token");
      const headers = {
        access_token: accessToken
      };
      serverAPI({
        method: "POST",
        url: "/cart",
        headers
      })
        .then(({ data }) => {
          commit("SET_CURRENT_CART", data.cart);
        })
        .catch(err => {
          console.log(err);
        });
    },
    fetchCartUser({ state, commit }) {
      const accessToken = localStorage.getItem("access_token");
      serverAPI({
        url: "/cart",
        method: "GET",
        headers: {
          access_token: accessToken
        }
      })
        .then(({ data }) => {
          commit("SET_CURRENT_CART", data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    fetchProducts({ state, commit }) {
      const accessToken = localStorage.getItem("access_token");
      serverAPI({
        url: "/products",
        method: "GET",
        headers: {
          access_token: accessToken
        }
      })
        .then(({ data }) => {
          commit("SET_PRODUCTS", data.products);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCurrentProduct({ state, commit }, payload) {
      const accessToken = localStorage.getItem("access_token");
      const _id = payload._id;
      serverAPI({
        url: `/products/${_id}`,
        method: "GET",
        headers: {
          access_token: accessToken
        }
      })
        .then(({ data }) => {
          commit("SET_CURRENT_PRODUCT", data.products[0]);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  modules: {}
});
