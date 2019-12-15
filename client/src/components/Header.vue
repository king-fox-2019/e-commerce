<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <router-link to="/" class="navbar-brand">Un-Commerce</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item" v-if="!username">
              <b-link class="nav-link" :to="{ path: '/login' }">Login</b-link>
            </li>
            <li class="nav-item" v-if="!username">
              <b-link class="nav-link" :to="{ path: '/register' }"
                >Register</b-link
              >
            </li>
            <li class="nav-item" v-if="username">
              <b-link class="nav-link" disabled>{{ username }}</b-link>
            </li>
            <li class="nav-item" v-if="username">
              <b-link class="nav-link" @click.prevent="logout">Logout</b-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    logout() {
      // localStorage.removeItem("token");
      // localStorage.removeItem("username");
      this.$store.commit("UPDATE_USERNAME", { username: "" });
      this.$store.commit("UPDATE_ACCESS_TOKEN", { access_token: "" });
      this.$swal("Success logout", "", "success");
    }
  },
  computed: {
    username() {
      return this.$store.state.username;
    }
  }
};
</script>

<style>
</style>
