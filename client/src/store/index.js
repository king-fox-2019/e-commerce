import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cart: []
    },
    mutations: {
        addItemToCart(state, payload) {
            state.cart.push(payload)
        },
        setCartClear(state){
            state.cart.clear
        }
    },
    actions: {
        addItemToCart(context, payload) {
            context.commit('addItemToCart', payload)
        },
        setCartClear(context){
            context.commit('setCartClear')
        }
    },
    modules: {},
    getters: {
        cartList: state => {
            return state.cart
        }
    }
})
