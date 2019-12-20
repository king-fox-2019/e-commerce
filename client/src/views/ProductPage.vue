<template>
  <div>
    <!-- Page Content -->
    <div class="container">
      <div class="row">
        <div class="col-lg-9">
          <Carousel />
          <div class="row">
            <ProductCard
              v-for="product in products"
              :productDetail="product"
              :key="product.id"
            />
          </div>
        </div>
        <SideBar />
      </div>
      <!-- /.row -->
    </div>
    <!-- /.container -->
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
import SideBar from "@/components/SideBar.vue";
import Carousel from "@/components/Carousel.vue";

export default {
  name: "ProductPage",
  components: {
    ProductCard,
    SideBar,
    Carousel
  },
  computed: {
    products() {
      return this.$store.state.products;
    }
  },
  created() {
    this.$store.dispatch("fetchAllProducts");
  }
};
</script>

<style></style>
