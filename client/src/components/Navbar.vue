<template>
  <b-navbar toggleable="lg" type="dark" variant="accent">
    <b-navbar-brand to="/">LaZaloPedia</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto" v-if="onSession">
        <b-nav-item to="/signup">Cart</b-nav-item>
        <b-nav-item to="/signin">Sign Out</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto" v-else>
        <b-nav-item to="/signup">Sign Up</b-nav-item>
        <b-nav-item to="/signin">Sign In</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {}
  },
  computed: {
    onSession() {
      return this.$store.state.onSession
    }
  }
}
</script>

<style></style>
