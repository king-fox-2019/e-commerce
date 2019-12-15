<template>
  <div>
    <h1>INI HALAMAN CART</h1>
  </div>
</template>

<script>
export default {
  computed: {
    cart() {
      let cart = this.$store.state.cartEb;
      let cart2 = this.$store.state.cartEs;
      console.log(cart)
      console.log(cart2)
      return cart2;
    },
  },
};
</script>

<style scoped>

</style>
