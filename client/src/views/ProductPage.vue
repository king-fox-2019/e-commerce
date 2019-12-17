<template>
  <div class="container">
    <div class="row d-flex flex-wrapper justify-content-center align-items-center">
      <ProductCard
        v-for="(product) in this.$store.state.products"
        :key="product._id"
        :ProductData="product"
      ></ProductCard>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import ProductCard from "../components/ProductBlock";
// import CategoryBlock from "@/components/CategoryBlock.vue";
export default {
  name: "ProductPage",
  components: {
    ProductCard
  },
  props: ["ProductData"],
  data() {
    return {
      products: []
    };
  },
  methods: {
    viewCart() {
      this.$router.push("/cart");
    }
  },
  created() {
    this.$store.dispatch("fetchProducts");
  }
};
</script>

<style scoped>
.container {
  /* width: 80%; */
}
.products-catagories-area {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 calc(100% - 320px);
  flex: 0 0 calc(100% - 320px);
  width: calc(100% - 320px);
  max-width: calc(100% - 320px);
}

/* @media only screen and (max-width: 767px) {
  .main-content-wrapper .products-catagories-area {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 100%;
    flex: 0 0 100%;
    width: 100%;
    max-width: 100%;
  }
} */
</style>
