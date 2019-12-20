<template>
  <div class="row products">
    <product-item v-for="product in $store.state.products" :key="product.id" :product="product"></product-item>
  </div>
</template>

<script>
import ProductItem from '../components/ProductItem'
export default {
  components: {
    ProductItem
  },
  created () {
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<style>

</style>
