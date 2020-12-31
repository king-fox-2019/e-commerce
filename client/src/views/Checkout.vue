<template>
  <div class="mt-5 justify-content-center">
    <div class="checkout mb-5">
      <h1>CHECKOUT</h1>
      <p>Items: {{items}}</p>
      <p>Total price: {{price}}</p>
      <b-button variant="outline-primary" @click.prevent="checkout">Checkout</b-button>
    </div>
  </div>
</template>

<script>
import { mapActions,mapGetters } from 'vuex'

export default {
  name:'checkout',
  data () {
    return {
      items:'',
      price:0
    }
  },
  computed: {
    ...mapGetters({cartItems:'cart/cartItems'})
  },
  methods: {
    ...mapActions({checkoutCart:'cart/checkoutCart'}),
    checkout(){
      this.checkoutCart()
      this.$swal({
        type:'success',
        title:'Checked Out',
        timer:1500
      })
      this.$router.push({path:'/product'})
    }
  },
  created () {
    let barang = []
    for(let item of this.cartItems){
      barang.push(item.name)
      this.price+=item.price*item.quantity
    }
    this.items = barang.join(', ')
  }
}
</script>

<style scoped>
.checkout{
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  text-align: center;
  padding: 20px;
}
</style>
