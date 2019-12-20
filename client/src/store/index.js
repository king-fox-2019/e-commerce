import Vue from "vue";
import Vuex from "vuex";
import serverAPI from "../../config/serverAPI";

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
    signinGoogleAccount({ dispatch, commit }, payload) {
      const data = {
        gProfile: payload.gProfile
      };
      return serverAPI({
        method: "POST",
        url: `users/gsignin`,
        data
      }).then(({ data }) => {
        localStorage.setItem("access_token", data.token);
        dispatch("fetchCartUser");
        commit("SET_SESSION", true);
        return data;
      });
    },
    signinUser({ dispatch, commit }, payload) {
      const data = {
        email: payload.email,
        password: payload.password
      };
      return serverAPI({
        url: "/users/signin",
        method: "POST",
        data
      }).then(({ data }) => {
        localStorage.setItem("access_token", data.token);
        dispatch("fetchCartUser");
        commit("SET_SESSION", true);
        return data;
      });
    },
    signupUser({ commit, dispatch }, payload) {
      const data = {
        name: payload.name,
        email: payload.email,
        password: payload.password
      };
      return serverAPI({
        url: "/users/signup",
        method: "POST",
        data
      }).then(({ data }) => {
        commit("SET_SESSION", true);
        localStorage.setItem("access_token", data.token);
        dispatch("createCart");
        dispatch("fetchCartUser");
        return data;
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
      return serverAPI({
        method: "PATCH",
        url: "/users/becomeaseller",
        headers,
        data
      }).then(({ data }) => {
        return data;
      });
    },
    updateCart({ dispatch }, payload) {
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
      return serverAPI({
        method: "PATCH",
        url: "/cart",
        headers,
        data
      }).then(({ data }) => {
        dispatch("fetchCartUser");
        dispatch("fetchProducts");
        return data;
      });
    },
    createCart({ dispatch, commit }) {
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
          dispatch("fetchCartUser");
        })
        .catch(err => {
          console.log(err);
        });
    },
    fetchCartUser({ commit }) {
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
    fetchProducts({ commit }) {
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
    getCurrentProduct({ commit }, payload) {
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
