<template>
  <div class="container py-3">
    <h1>Your Cart</h1>
    <div class="container">
      <b-card
        v-for="product in cart"
        :key="product._id"
        :img-src="product.product.image"
        img-alt="Card image"
        img-left
        class="mb-3"
      >
        <b-card-body>
          <b-card-title>{{ product.product.name }}</b-card-title>
          <b-card-text
            >Price: {{ product.product.price * product.amount }}</b-card-text
          >
          <b-card-text>Amount: {{ product.amount }}</b-card-text>
          <b-button variant="danger" @click="deleteCart(product.product._id)"
            >Delete</b-button
          >
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from "@/utils/axios-instance.js";

export default {
  name: "CartPage",
  methods: {
    deleteCart(productId) {
      axios
        .delete("/cart", {
          params: {
            productId
          },
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          this.$swal.fire({
            type: "success",
            title: "success delete your cart",
            showConfirmButton: false,
            timer: 1500
          });
          this.$store.dispatch("fetchAllCart");
        })
        .catch(error => {
          if (error.response) console.log(error.response);
          else console.log(error, "error");
        });
    }
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    }
  }
};
</script>
