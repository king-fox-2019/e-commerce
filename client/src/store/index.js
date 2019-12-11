import Vue from 'vue'
import Vuex from 'vuex'
import Cart from './modules/cart'
import Product from './modules/product'
import User from './modules/user'
import Transaction from './modules/transaction'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cart: Cart,
    product: Product,
    user: User,
    transaction: Transaction
  }
})
