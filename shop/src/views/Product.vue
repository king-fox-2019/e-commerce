<template>
    <v-container class="my-10 py-10">
        <v-row>
            <v-col cols="6">
                <v-img :src="productDetail.image"
                max-height="500" max-width="500"></v-img>
            </v-col>
            <v-col cols="6">
                <h2>{{productDetail.name}}</h2>
                <h5>Price: $ {{productDetail.price}}</h5>
                <h5>Stock: {{productDetail.stock}} left</h5>
                <button class="custombtn pa-2 my-5"
                    @click.prevent="addToCart"
                    v-if="productDetail.stock > 0">
                    Add to Cart
                </button>
                <p v-else>OUT OF STOCK</p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'product',
  props: ['productDetail'],
  methods: {
    addToCart () {
      if (!this.isLoggedIn) {
        this.swal("customError", "You have to log in first")
      } else {
        this.$store.dispatch('addToCart', {
          id: this.productDetail._id,
          quantity: 1
        })
        .then(data => {
          this.$router.push('/cart')
          this.swal('success', 'Added to cart!')
        })
        .catch(err => {
          this.swal('error', error)
        })
      }
    },
    checkProductDetail() {
      if (!this.productDetail) {
        let id = this.$route.params.id
        this.$store.dispatch('fetchProductDetail', id)
          .then(data => {
            this.productDetail = data
          })
      }
    }
  },
  created() {
    this.checkProductDetail()
  },
  computed: {
    ...mapState(['isLoggedIn'])
  }
}
</script>

<style scoped>
img {
    height: 500px;
    width: 500px
}

.custombtn {
    background-color: white;
    border: 1px solid black;
}
</style>
