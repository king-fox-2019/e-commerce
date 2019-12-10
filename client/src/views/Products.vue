<template>
  <b-container class="bv-example-row">
    <b-row>
      <card v-for="product in productList" :product="product" :key="product._id"/>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios';
import card from '@/components/product.vue';

export default {
  data() {
    return {
      productList: [],
    };
  },
  components: {
    card,
  },
  methods: {
    fetchProducts() {
      axios({
        method: 'get',
        url: 'http://localhost:3000/product',
      })
        .then(({ data }) => {
          this.productList = data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
  created() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
</style>
