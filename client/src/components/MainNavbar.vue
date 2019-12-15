<template>
  <div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand to="/">Kulakan</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/products">Products</b-nav-item>
      </b-navbar-nav>

      <!-- <b-navbar-nav class="mx-auto justify-content-center" style="width: 100vh">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search" style="width: 80vh"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
      </b-navbar-nav> -->

      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="isSignedIn" to="/cart">Cart</b-nav-item>
        <!-- <b-nav-item to="/admin">Admin</b-nav-item> -->
        <b-nav-item v-if="!isSignedIn" to="account/signin">Sign In</b-nav-item>
        <b-nav-item v-if="isSignedIn" @click.prevent="signOut">Sign Out</b-nav-item>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import { mapState } from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: 'MainNavbar.vue',
  data () {
    return {
    }
  },
  methods: {
    signOut() {
      this.$store.dispatch('signOut')
    }
  },
  computed: mapState(['isSignedIn'])
}
</script>

<style>

</style>
