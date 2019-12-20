<template>
  <div>
    <h2>{{ productDetail.name }}</h2>
    <p>Product id: {{ $route.params.productId }}</p>
    <b-card
      :img-src="productDetail.image"
      img-alt="Card image"
      img-left
      class="mb-3"
    >
      <b-card-body>
        <b-card-text>Price: Rp. {{ productDetail.price }},-</b-card-text>
        <b-card-text>Stock: {{ productDetail.stock }}</b-card-text>
        <AddToCartButton @addToCart="addNewCart" />
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import AddToCartButton from '@/components/AddToCartButton.vue'
import axios from "@/utils/axios-instance.js";

export default {
  name: "ProductDetailComponent",
  data: function () {
    return {
      productDetail: {}
    }
  },
  components: {
    AddToCartButton
  },
  methods: {
    fetchDetailProduct() {
      axios.get("products/details", {
        params: {
          productId: this.$route.params.productId
        }
      })
        .then(({ data }) => {
          this.productDetail = data
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response)
          } else console.log(error, 'error')
        })
    },
    addNewCart(amount) {
      axios.post('/cart', {
        productId: this.$route.params.productId,
        amount
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.$swal.fire({
            type: "success",
            title: "added to cart",
            showConfirmButton: false,
            timer: 750
          })
          this.$store.dispatch("fetchAllCart")
        })
        .catch(error => console.log(error.response.data, 'error'))
    }
  },
  created() {
    this.fetchDetailProduct()
  }
};
</script>

<style></style>
