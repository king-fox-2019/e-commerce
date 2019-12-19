<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="../assets/bookplus-logo.png" alt="Bookplus logo" />
        <h1>Book+</h1>
      </b-navbar-item>
    </template>
    <template slot="start">
    </template>

    <template slot="end">
      <b-navbar-item tag="div">

        <b-dropdown class="cart-dropdown" 
          hoverable aria-role="list"
          v-if="isLoggedIn && currentUser.role === 'customer'"
          >
          <img class="navbar-item cart-icon"
            role="button"
            slot="trigger"
            :src="shoppingCartIcon"
            alt="cart-icon"
            srcset
            />
          <b-navbar-item
            @click.prevent="showCart"
            >
            Cart
          </b-navbar-item>
          <b-navbar-item
            @click.prevent="showTransaction"
            >
            Transactions
          </b-navbar-item>
        </b-dropdown>

        <b-navbar-item
          class="mr-3"
          >
          <router-link to="/all-transactions"
            v-if="isLoggedIn && currentUser.role === 'admin'"
            >Transactions</router-link>
        </b-navbar-item>

        <div class="buttons">
          <router-link 
            v-if="!isLoggedIn" 
            class="button is-primary" 
            to="/signinjoin">Sign in / join</router-link>

          <router-link
            @click.native="signOut()"
            v-if="isLoggedIn"
            class="button is-primary"
            to="/signout"
          >Sign out</router-link>

        </div>
        
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { mapState } from 'vuex'
import toastMixin from '../mixins/toastMixin'

export default {
  name: "navbar",

  props: ["accessToken"],

  data() {
    return {
      shoppingCartIcon: require('@/assets/shopping-cart-icon.jpg')
    }
  },

  methods: {
    showCart() {
      this.$router.push('/cart')
    },

    showTransaction() {
      this.$router.push('/transaction')
    },

    signOut() {
      localStorage.removeItem('access_token')
      this.success('Successfully signed out!')
      this.$store.dispatch('checkToken')
      this.$router.push('/')
    }
  },
  
  computed: {
    ...mapState(['isLoggedIn', 'currentUser'])
  },

  mixins: [toastMixin]
}
</script>

<style>
  .cart-icon {
    height: 30px !important;
    width: 30px !important;
    visibility: visible !important;
    padding: 0 !important;
    max-height: none !important;
  }

  .navbar .dropdown-menu {
    min-width: 9rem !important;
  }
</style>