<template>
    <div class="container">
        <div class="row my-2">
            <div class="col-6">
                <img :src="productDetail.image" />
            </div>
            <div class="col-6">
                <h2>{{productDetail.name}}</h2>
                <h5>Price: {{productDetail.price}}</h5>
                <h5>Stock: {{productDetail.stock}} left</h5>
                <button class="custombtn p-2"
                    @click.prevent="addToCart"
                    v-if="productDetail.stock > 0">
                    Add to Cart
                </button>
                <p v-else>OUT OF STOCK</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'product',
  props: ['productDetail'],
  methods: {
    addToCart () {
      this.$store.dispatch('addToCart', {
        id: this.productDetail._id,
        quantity: 1
      })
        .then(data => {
          this.$router.push('/cart')
          this.swal('success', 'Added to cart!')
        })
        .catch(err => {
          this.swal('err', error)
        })
    }
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
