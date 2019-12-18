<template>
  <div class="col-lg-4 col-md-6 mb-4">
    <div class="card h-100">
      <a href="#">
        <img class="card-img-top" :src="productDetail.image" alt="" />
      </a>
      <div class="card-body">
        <h4 class="card-title">
          <!-- <a href="#">{{ productDetail.name }}</a> -->
          <b-link :to="{ path: `/detail/${productDetail._id}` }">{{
            productDetail.name
          }}</b-link>
        </h4>
        <h5>Rp. {{ productDetail.price }},-</h5>
        <h5>Stock {{ productDetail.stock }}</h5>
        <p class="card-text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam
          aspernatur!
        </p>
        <CartButton v-if="username" @addToCart="addNewChart" />
      </div>
      <div class="card-footer">
        <small class="text-muted">
          &#9733; &#9733; &#9733; &#9733; &#9734;
        </small>
      </div>
    </div>
  </div>
</template>

<script>
import AddToCartButton from "@/components/AddToCartButton.vue";
import axios from "../utils/axios-instance.js";

export default {
  name: "ProductCard",
  props: ["productDetail"],
  components: {
    CartButton: AddToCartButton
  },
  computed: {
    username() {
      return this.$store.state.username;
    }
  },
  methods: {
    addNewChart(amount) {
      axios
        .post(
          "/cart",
          {
            productId: this.productDetail._id,
            amount
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          this.$swal.fire({
            type: "success",
            title: "added to cart",
            showConfirmButton: false,
            timer: 750
          });
          this.$store.dispatch("fetchAllCart");
        })
        .catch(error => console.log(error.response.data, "error"));
    }
  }
};
</script>

<style></style>
