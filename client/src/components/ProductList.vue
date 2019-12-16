<template>
  <b-container>
    <b-row>
      <ProductItem 
        v-for="product in $store.state.products" 
        :key="product._id" 
        :product="product" 
      />
    </b-row>
  </b-container>
</template>

<script>
import ProductItem from './ProductItem'

export default {
  components: {
    ProductItem
  },
  created() {
    this.$store.dispatch('getProducts')
  }
}
</script>

<style scoped>

</style>