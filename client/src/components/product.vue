<template>
  <b-card
    :title="name"
    img-src='https://picsum.photos/600/300/?image=25'
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2 mt-5 mr-3"
  >
    <b-card-text>
      Price: {{ priceFormat }} <br>
      Stock: {{ product.stock }} <br>
      Qty: {{ qty }}
      <b-form-select
        class="mb-2 mt-2 mr-sm-2 mb-sm-0"
        v-model="qty"
        :options="{ 1: 'One', 2: 'Two', 3: 'Three', 4: 'Four', 5: 'Five' }"
        id="inline-form-custom-select-pref"
      >
      </b-form-select>
    </b-card-text>

    <b-button href="#" variant="primary">Add to cart</b-button>
  </b-card>
</template>

<script>
import axios from '../../api/server';

export default {
  name: 'product',
  props: {
    product: {
      type: Object,
    },
  },
  data() {
    return {
      name: this.product.name,
      totalPrice: '',
      qty: 0,
    };
  },
  methods: {
    addToCart() {

    },
  },
  computed: {
    priceFormat() {
      return `${this.product.price},00 IDR`;
    },
  },
};
</script>

<style scoped>
</style>
