<template>
  <div id="proudct">
    <b-card
      :title="name"
      :img-src="product.image"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem; font-family: 'Roboto Condensed', sans-serif;"
      class="mr-3 mt-5"
    >data
      <b-card-text>
        Price: {{ priceFormat }} <br>
        Stock: {{ product.stock }} <br>
      </b-card-text>
      <b-button href="#" variant="primary">Add to cart</b-button>
    </b-card>
  </div>
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
      qty: 1,
    };
  },
  methods: {
    addToCart(product) {
      if (localStorage.getItem('token')) {
        axios.post('/cart', {
          qty: this.qty,
          product,
        })
          .then(({ data }) => {
            this.$swal.fire(
              'Thank You!',
              data.message,
              'success',
            );
          })
          .catch((err) => {
            const errors = err.response.data.join(' | ');
            this.$swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: errors,
            });
          });
      } else {
        this.$swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You have to login.',
        });
      }
    },
  },
  computed: {
    priceFormat() {
      return `Rp${this.product.price},00`;
    },
  },
};
</script>

<style scoped>
</style>
