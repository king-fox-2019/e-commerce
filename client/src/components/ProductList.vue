<template>
  <div class="row products">
    <product-item v-for="product in listProducts" :key="product.id" :product="product"></product-item>
  </div>
</template>

<script>
import ProductItem from '../components/ProductItem'
export default {
  components: {
    ProductItem
  },
  data: function () {
    return {
      listProducts: [
        {
          id: 1,
          name: 'Fur coat with very but very very long name until sundul ke card setelahnya',
          price: 143
        },
        {
          id: 2,
          name: 'Coat with very name',
          price: 14
        },
        {
          id: 3,
          name: 'But very very long name',
          price: 1123
        },
        {
          id: 4,
          name: 'Very but very very name',
          price: 145
        },
        {
          id: 5,
          name: 'Very but very very name',
          price: 145
        },
        {
          id: 6,
          name: 'Very but very very name',
          price: 145
        },
        {
          id: 7,
          name: 'Very but very very name',
          price: 145
        }
      ]
    }
  }
}
</script>

<style>

</style>
