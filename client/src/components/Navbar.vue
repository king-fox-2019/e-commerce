<template>
  <b-navbar
    toggleable="lg"
    type="dark"
    :variant="$route.path == '/' ? 'navbar' : 'primary'"
    fixed="top"
  >
    <b-navbar-brand to="/">LaZaloPedia</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto" v-if="onSession">
        <b-nav-item to="/signup">Cart</b-nav-item>
        <b-nav-item @click="onSignOut">Sign Out</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto" v-else-if="$route.path != '/session'">
        <!-- <b-nav-item to="/session?">Sign Up</b-nav-item> -->
        <b-nav-item :to="`/session?from=${$route.fullPath}&on=signin`"
          >Sign In</b-nav-item
        >
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
      return this.$store.state.user.onSession
    }
  },
  methods: {
    onSignOut() {
      this.$store.dispatch('ON_SIGN_OUT')
    }
  }
}
</script>

<style lang="scss"></style>
