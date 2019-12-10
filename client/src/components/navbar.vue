<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand to="/" >e-Commerce</b-navbar-brand>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/products">Products</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-form @submit.prevent="search">
          <b-form-input size="sm" class="mr-sm-2" v-model="query" placeholder="Search">
          </b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
        <b-nav-item-dropdown right>
          <template v-slot:button-content>
            <em>User</em>
          </template>
          <section v-show="status">
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Cart</b-dropdown-item>
            <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
          </section>
          <section v-show="!status">
              <b-dropdown-item to="/login">Login/Register</b-dropdown-item>
          </section>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'navbar',
  props: {
    status: {
      type: Boolean,
    },
  },
  data() {
    return {
      query: '',
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$emit('localstorage');
      this.$swal('See you soon!');
    },
  },
};
</script>

<style scoped>
</style>
