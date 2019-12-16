<template>
  <div class="cart">
    <b-container fluid>
      <b-row  class="d-flex justify-content-center">
        <div class="col-sm-16">
          <CartItem></CartItem>
        </div>
        <!-- <div class="col-sm-4">
          <Checkout></Checkout>
        </div> -->
      </b-row>
    </b-container>
    <router-view></router-view>
  </div>
</template>

<script>
import CartItem from '@/components/CartItem.vue'
// import Checkout from '@/components/Checkout.vue'

export default {
  name: 'cart',
  components: {
    CartItem
    // Checkout
  }
}
</script>

<style>
</style>
