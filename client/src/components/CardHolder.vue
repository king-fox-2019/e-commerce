<template>
  <div>
    <div v-for="(product, index) in allProducts" :key="index">
      <Card :productData="product"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Card from "../components/Card";

export default {
  name: "CardHolder",
  components: {
    Card
  },
  data() {
    return {};
  },
  beforeMount() {
      console.log('masuk created');
      console.log(this.$router);
      
    this.fetchProducts();
  },
  computed: {
    ...mapGetters({
      allProducts: "getProducts"
    })
  },
  methods: {
    ...mapActions({
      fetchProducts: "fetchAllProducts"
    })
  }
};
</script>

<style scoped>
</style>