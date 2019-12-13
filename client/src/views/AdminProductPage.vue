<template>
  <div>
    <AdminCarousel></AdminCarousel>
    <div class="row">
      <AdminProductCard v-for="(product) in this.$store.state.products" :key="product._id" :ProductData="product"></AdminProductCard>
    </div>
  </div>
</template>

<script>
import AdminProductCard from '../components/AdminProductCard'
import AdminCarousel from '../components/AdminCarousel'

export default {
  name: 'AdminProductPage',
  components: {
    AdminCarousel,
    AdminProductCard
  },
  created () {
    this.$store.dispatch('getAllProducts')
  }
}
</script>

<style>

</style>
