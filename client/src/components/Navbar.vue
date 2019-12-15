<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <router-link to="/">
        <b>iCommerce</b>
      </router-link>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- <b-navbar-nav>
          <b-nav-item href="#">Link</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav>-->

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" style="width: 20vw" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <div style="width: 20vw" v-show="!this.$store.state.userID">
            <router-link to="/login">
              <b-button variant="outline-light" class="mr-sm-4">Login</b-button>
            </router-link>
            <router-link to="/register">
              <b-button variant="outline-light">Register</b-button>
            </router-link>
          </div>
          <div style="width: 20vw" v-show="this.$store.state.userID">
            <router-link to="/cart">
              <b-button variant="outline-light" class="mr-sm-4">Cart</b-button>
            </router-link>
            <b-button variant="outline-light" class="mr-sm-4" @click="logout">Logout</b-button>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {};
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$store.state.userID = null;
    }
  },
  created() {
    if (localStorage) this.$store.state.userID = true;
  }
};
</script>

<style scoped>
a,
a:hover {
  cursor: default;
  font-size: 1.3rem;
  color: antiquewhite;
  text-decoration: none;
}
a:hover {
  text-shadow: 0px 0px 30px white;
  transition-timing-function: ease-in;
  transition-duration: 0.3s;
}
* {
  outline: none !important;
  text-decoration: none;
}
</style>
