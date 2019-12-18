<template>
  <b-container>
    <b-row>

      <div v-for="item in this.$store.state.cart" :key="item._id">
        <div class="item-wrapper">
      
          <div class="product-img">
            <img :src="item.productId.image[0]" alt="" v-if="item.productId.image[0]">
          </div>
          
          <div class="product-desc">
            <h3>{{item.productId.name}}</h3>
            <div>{{item.productId.price}}</div>
            <div>{{item.quantity}}</div>
          </div>

          <div class="action-wrapper">
            <b-btn variant="outline-danger" @click="removeItem(item._id)">Remove</b-btn>
          </div>
      
        </div>
      </div>

    </b-row>
  </b-container>
</template>

<script>

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
  }
};
</script>

<style>
  .title {
    margin-bottom: 4rem;
  }
  .item-wrapper {
    display: flex;
    margin-bottom: 2rem;
  }
</style>