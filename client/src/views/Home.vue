<template>
  <div class="home">
    <div class="container">

      <div class="row">

        <div class="col-lg-3 mt-4">
          <div class="container shadow" style="height: 200px; width: 200px; display: flex; align-items: center; background-image: radial-gradient(pink, yellow, lavender, palegreen, blue, violet);  border-radius: 50%; padding: 10px;">
            <img src="../assets/geomancy-1.png" alt="Logo" style="margin: 0 auto;"/>
          </div>
          <hr>
          <b-button variant="info" @click.prevent="viewCart"> <i class="fas fa-shopping-cart"></i> View Cart </b-button>
          <hr>
          <b-button variant="info" @click.prevent="viewTransactions"> <i class="fas fa-receipt"></i> Transactions </b-button>
          <hr>
        </div>

        <div class="col-lg-9">
          <Carousel></Carousel>
          <div class="row">
            <ProductCard v-for="(product) in this.$store.state.products" :key="product._id" :ProductData="product"></ProductCard>
          </div>
        </div>

      </div>
      <!-- end of main row div -->
    </div>
    <!-- end of container div -->
  </div>
</template>

<script>
import Carousel from '../components/Carousel'
import ProductCard from '../components/ProductCard'
import Swal from 'sweetalert2'

export default {
  name: 'home',
  components: {
    Carousel,
    ProductCard
  },
  data () {
    return {
      products: []
    }
  },
  methods: {
    viewCart () {
      if (this.$store.state.isLogin) {
        this.$router.push('/cart')
      } else if (!this.$store.state.isLogin) {
        Swal.fire({
          title: 'You need to login first',
          showConfirmButton: true
        })
        this.$router.push('/login')
      }
    },
    viewTransactions () {
      if (this.$store.state.isLogin) {
        this.$router.push('/transaction')
      } else if (!this.$store.state.isLogin) {
        Swal.fire({
          title: 'You need to login first',
          showConfirmButton: true
        })
        this.$router.push('/login')
      }
    }
  },
  created () {
    this.$store.dispatch('getAllProducts')
  }
}
</script>
<style scoped>
.home {
  height: 100vh;
  overflow: scroll;
}
</style>
