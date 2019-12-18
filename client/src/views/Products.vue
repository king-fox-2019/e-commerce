<template>
  <b-container class="bv-example-row">
    <router-view class="mt-3" id="detail"/>
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
        url: 'http://35.247.176.70/product',
      })
        .then(({ data }) => {
          this.productList = data;
        });
    },
  },
  mounted() {
    this.fetchProducts();
  },
  created() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
</style>
