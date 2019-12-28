import Vue from 'vue'
import Vuex from 'vuex'
import Cart from './modules/cart'
import Product from './modules/product'
import User from './modules/user'
import Transaction from './modules/transaction'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cart: {
      namespaced: true,
      actions: Cart.actions,
      mutations: Cart.mutations,
      state: Cart.state
    },
    product: {
      namespaced: true,
      actions: Product.actions,
      mutations: Product.mutations,
      state: Product.state
    },
    user: {
      namespaced: true,
      actions: User.actions,
      mutations: User.mutations,
      state: User.state
    },
    transaction: {
      namespaced: true,
      actions: Transaction.actions,
      mutations: Transaction.mutations,
      state: Transaction.state
    }
  }
})
