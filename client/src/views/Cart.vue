<template>
  <div>
    <div v-for="item in $store.state.cart" :key="item._id">
        <CartItem :product="item"/>
    </div>
  </div>
</template>

<script>
import CartItem from '../components/CartItem';
export default {
  name: "cart",
  components: {
    CartItem
  },
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch('getCart')
  }
};
</script>

<style>
</style>