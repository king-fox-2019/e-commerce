import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const urlProd = 'http://34.66.28.216';
const url = 'http://localhost:3000';

const base = axios.create({
    baseURL: url
});

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cart: [],
        tempCart: {},
        currency: '',
        listItem: [],
        isLoading: 'loading'
    },
    mutations: {
        addItemToCart(state, payload) {
            state.cart = payload
        },
        addItemToTempCart(state, payload) {
            state.tempCart = payload
        },
        setCartClear(state) {
            state.cart.clear
        },
        currencyFormat(state, payload) {
            let segment = [];
            let n = [];
            let priceReverse = "0" + payload.toString().split("").reverse().join("");
            for (let i = 1; i <= priceReverse.length + 1; i++) {
                n.unshift(priceReverse[i]);
                if (i % 3 === 0) {
                    segment.unshift(n.join(""));
                    n = [];
                }
            }
            state.currency = segment.join(".");
        },
        getListItems(state, payload) {
            state.listItem = payload
        },
        setLoading(state, payload){
            state.isLoading = payload
        }
    },
    actions: {
        addItemToCart(context, payload) {
            context.commit('addItemToCart', payload)
        },
        addItemToTempCart(context, payload) {
            context.commit('addItemToTempCart', payload)
        },
        setCartClear(context) {
            context.commit('setCartClear')
        },
        currencyFormat(context, payload) {
            context.commit('currencyFormat', payload)
        },
        getListItems(context, payload) {
            let searchUrl = "";
            if (payload) {
                searchUrl = `/api/items/${payload}`
            } else {
                searchUrl = '/api/items'
            }

            base({
                method: 'get',
                url: searchUrl
            }).then(response => {
                // console.log(response.data.data);
                context.commit('getListItems', response.data.data);
                context.commit('setLoading', '')
            }).catch(err => {
                console.log(err.response);
            })
        }
    },
    modules: {},
    getters: {
        cartList: state => {
            return state.cart
        },
        cartTemp: state => {
            return state.tempCart
        },
        currency: state => {
            return state.currency
        },
        itemList: state => {
            return state.listItem
        },
        loadingIs: state => {
            return state.isLoading
        }
    }
})
