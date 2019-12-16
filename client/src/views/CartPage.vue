<template>
  <div class="ui container">
    <CartProduct class="cart-items"></CartProduct>
  </div>
</template>

<script>
import CartProduct from '../components/CartProduct'
export default {
  components: {
    CartProduct
  }
}
</script>

<style>
.cart-items {
  margin-top: 150px;
  margin-bottom: 50px;
}
</style>
