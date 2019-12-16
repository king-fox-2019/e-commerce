<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-4" v-for="product in products" :key="product._id" @click="productDetail(product)">
        <p>{{product.name}}</p>
        <img :src="product.image" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'productList',
  created () {
    this.$store.dispatch('fetchProducts')
  },
  computed: {
    ...mapState(['products'])
  },
  methods: {
    productDetail (product) {
      this.$router.push({
        name: 'product',
        params: {
          productDetail: product
        }
      })
    }
  }
}
</script>

<style scoped>
img {
  height: 250px;
  width: 250px;
  object-fit: cover;
}
</style>
