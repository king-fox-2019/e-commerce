<template>
  <b-navbar
    toggleable="lg"
    type="dark"
    :variant="$route.path == '/' ? 'navbar' : 'primary'"
    fixed="top"
  >
    <b-navbar-brand to="/admin/dashboard" exact>Dashboard</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto" v-if="onSession">
        <b-nav-item to="/admin/items">Items</b-nav-item>
        <b-nav-item to="/admin/transactions">Transactions</b-nav-item>
        <b-nav-item @click="onSignOut">Sign Out</b-nav-item>
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
      return this.$store.state.admin.adminSession
    }
  },
  methods: {
    onSignOut() {
      this.$store.dispatch('ON_SIGN_OUT')
      this.$router.replace('/')
    }
  }
}
</script>
