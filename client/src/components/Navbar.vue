<template>
  <b-navbar
    toggleable="lg"
    type="dark"
    :variant="$route.path == '/' ? 'navbar' : 'primary'"
    fixed="top"
  >
    <b-navbar-brand to="/" exact>LaZaloPedia</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto" v-if="onSession">
        <b-nav-item to="/cart">Cart</b-nav-item>
        <b-nav-item-dropdown text="Account" right>
          <b-dropdown-item to="/transactions">Transactions</b-dropdown-item>
          <b-dropdown-item @click="onSignOut">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
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
      this.$router.replace('/')
    }
  }
}
</script>

<style lang="scss">
.b-nav-dropdown {
  .dropdown-menu {
    background-color: var(--primary);
    .dropdown-item {
      color: rgba(255, 255, 255, 0.5);
      &.active {
        color: #fff;
      }
    }
    .dropdown-item:hover {
      background-color: transparent !important;
      color: rgba(255, 255, 255, 0.75);
      &.active {
        color: #fff;
      }
    }
  }
}
</style>
