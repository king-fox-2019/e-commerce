import Vue from "vue";
import Vuex from "vuex";
import axios from "../utils/axios-instance";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: "",
    access_token: "",
    products: [],
    cart: []
  },
  mutations: {
    UPDATE_USERNAME(state, payload) {
      state.username = payload.username;
    },
    UPDATE_ACCESS_TOKEN(state, payload) {
      state.access_token = payload.access_token;
    },
    UPDATE_PRODUCTS(state, payload) {
      state.products = payload.products;
    },
    UPDATE_CART(state, payload) {
      state.cart = payload.cart
    }
  },
  actions: {
    fetchAllProducts(context) {
      axios
        .get("/products")
        .then(({ data }) => {
          context.commit("UPDATE_PRODUCTS", { products: data });
        })
        .catch(console.log);
    },
    fetchAllCart(context) {
      axios
        .get('/cart', {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          context.commit("UPDATE_CART", { cart: data })
        })
        .catch(console.log)
    }
  },
  modules: {}
});
