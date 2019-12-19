<template>
  <div class="col-lg-4 col-md-6 mb-4">
    <div class="card h-100">
      <div class="card-imgg">
        <img class="card-img-top" :src=ProductData.image alt="product-image" style="object-fit: contain; height: 200px; width: 200px"/>
      </div>
      <div class="card-body">
        <h4 class="card-title">
          <span>{{ ProductData.name }}</span>
        </h4>
        <h5>Price: Rp.{{ ProductData.price }}</h5>
        <h6>Stock: {{ ProductData.stock }}</h6>
      </div>
      <div class="card-footer" v-if="$store.state.isLogin">
        <div v-if="ProductData.stock > 0">
          <small class="text-muted"><b-button @click.prevent="addToCart({ product_id: ProductData._id })"> <i class="fas fa-shopping-basket"></i> Add to cart </b-button></small>
        </div>
        <div v-if="ProductData.stock <= 0">
          <small class="text-muted"><b-button @click.prevent="addToCart({ product_id: ProductData._id })" disabled> <i class="fas fa-shopping-basket"></i> Add to cart </b-button></small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['ProductData'],
  methods: {
    addToCart (productId) {
      this.$store.dispatch('addToCart', productId)
    }
  }
}
</script>

<style scoped>
.card-imgg {
  padding: 5px;
}
</style>
