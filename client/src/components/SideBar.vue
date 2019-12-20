<template>
  <div v-if="username" class="col-lg-3">
    <h1 class="my-4">Menu</h1>
    <div class="list-group">
      <b-link :to="{ 'path': '/cart' }" class="list-group-item"
        >Cart
        <b-badge variant="primary">{{ cart.length }}</b-badge>
      </b-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  computed: {
    username() {
      return this.$store.state.username;
    },
    cart() {
      return this.$store.state.cart;
    }
  }
};
</script>

<style></style>
