<template>
  <b-container>
    <b-row>
      <div class="empty-cart" v-if="totalPrice <= 0">
        <h1>Your Cart is empty</h1>
      </div>
      <div class="cart-list" v-for="item in this.$store.state.cart" :key="item._id">
        <div class="item-wrapper">
      
          <div class="product-img">
            <img :src="item.productId.image[0]" alt="" v-if="item.productId.image[0]">
          </div>
          
          <div class="product-desc">
            <h3>{{item.productId.name}}</h3>
            <div class="product-field">
              <label>Price</label>
              <div>: {{item.productId.price}}</div>
            </div>
            <div class="product-field">
              <label>Quantity</label>
              <div>: {{item.quantity}}</div>
            </div>
          </div>

          <div class="action-wrapper">
            <b-btn variant="outline-danger" @click="removeItem(item._id)">Remove</b-btn>
          </div>
      
        </div>
      </div>
      <div v-if="totalPrice > 0">
        <h1>Total: {{ totalPrice }}</h1>
      </div>

    </b-row>
  </b-container>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: "cart",
  components: {
  },
  data() {
    return {};
  },
  created() {
    this.$store.dispatch('getCart')
  },
  methods: {
    removeItem(id) {
      this.$store.dispatch('removeItemFromCart', id)
    }
  },
  computed: mapGetters(['totalPrice'])
};
</script>

<style>
  .empty-cart {
    width: 100%;
    text-align: center;
  }
  .title {
    margin-bottom: 4rem;
  }
  .cart-list {
    width: 100%;
  }
  .item-wrapper {
    display: flex;
    margin-bottom: 2rem;
    width: 100%;
    border: 1px solid #c4c4c4;
    border-radius: 4px;
    padding: 1rem;
  }
  .product-field {
    display: flex;
  }
  .product-desc label {
    width: 70px;
    display: inline-block;
  }
  .product-img img {
    margin-right: 2rem;
    width: 140px;
    height: 140px;
  }
  .action-wrapper {
    margin-left: auto;
  }
</style>