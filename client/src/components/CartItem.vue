<template>
  <div>
    <div class="item-wrapper">
      
      <div class="product-img">
        <img :src="product.productId.image[0]" alt="">
      </div>
      
      <div class="product-desc">
        <h3>{{product.productId.name}}</h3>
        <div>{{product.productId.price}}</div>
        <div>{{product.quantity}}</div>
      </div>

      <div class="action-wrapper">
        <b-btn variant="outline-danger" @click="removeItem(product._id)">Remove</b-btn>
      </div>
    
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: localStorage.getItem('name')
    }
  },
  props: {
    product: {
      type: Object
    }
  },
  methods: {
    removeItem(id) {
      this.$store.dispatch('removeItemFromCart', id)
    }
  }
}
</script>

<style scoped>
  .item-wrapper {
    display: flex;
    margin-bottom: 2rem;
    border: 1px solid red;
  }
  .product-img img {
    width: 50px;
    height: 50px;
  }
</style>