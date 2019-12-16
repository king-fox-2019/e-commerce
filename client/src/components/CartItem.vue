<template>
  <div class="mt-3 cart" v-if="this.cartItems.length>0">
    <h2 class="item">Your Items</h2>
    <div class="mb-4 item" v-for="(item,n) in this.cartItems" :key="n">
      <b-img thumbnail fluid :src="item.image"></b-img>
      <p>Product Name: {{item.name}}</p>
      <p>Product Price: {{item.price}}</p>
      <p>Quantity: {{item.quantity}}</p>
      <b-btn variant="outline-danger" style="margin-top:3vh" @click.prevent="deleteOne(item._id)">Delete Item</b-btn>
    </div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-5" style="border-right:5px double rgba(0,0,0,.2)">
          <h2 class="mb-3">Clear Your Cart</h2>
          <b-btn v-if="this.cartItems.length>0" variant="outline-danger" class="mb-3" @click.prevent="emptyCart">Clear Cart</b-btn>
        </div>
        <div class="col-md-5">
          <h2 class="mb-3">Checkout Now?</h2>
          <b-btn variant="outline-primary" @click.prevent="checkout">Yes!</b-btn>  
        </div>  
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'

export default {
  data () {
    return {
      quantity: 1
    }
  },
  methods: {
    ...mapActions({getCartItems:'cart/getCartItems',
                   emptyCartItems:'cart/emptyCartItems',
                   deleteOneItem:'cart/deleteOneItem'}),
    checkout () {
      this.$router.push({path:'/cart/checkout'})
    },
    deleteOne (productId) {
      this.$swal({
        type:'warning',
        title:'Are you sure?',
        text: 'This will delete your item.',
        showCancelButton: true,
        confirmButtonText: 'Delete item!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      })
      .then(result=>{
        if(result.value){
          this.deleteOneItem({productId})
          this.$swal.fire(
            'Success!',
            'Item deleted.',
            'success'
          )
        }
      })
    },
    emptyCart () {
      this.$swal({
        type:'warning',
        title:'Are you sure?',
        text: 'This will empty your cart.',
        showCancelButton: true,
        confirmButtonText: 'Empty the cart!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      })
      .then(result=>{
        if(result.value){
          this.emptyCartItems()
          this.$swal.fire(
            'Success!',
            'Your cart has been emptied.',
            'success'
          )
          this.$router.push({path:'/product'})
        }
      })
    }
  },
  computed:{
    ...mapGetters({cartItems:'cart/cartItems'})
  },
  created(){
    this.getCartItems()
  }
}
</script>

<style scoped>
.cart{
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  text-align: center;
  padding: 20px;
}
.item{
  padding:20px;
  border-bottom: 5px double rgba(0, 0, 0, 0.2)
}
</style>

// <div class="d-flex justify-content-center">
//         <b-input-group prepend="Quantity" class="col-sm-6">
//           <b-input-group-prepend>
//             <b-btn variant="outline-info" @click="substractQuantity">-</b-btn>
//           </b-input-group-prepend>

//           <b-form-input type="number" min="0.00" v-model="quantity"></b-form-input>

//           <b-input-group-append>
//             <b-btn variant="outline-secondary" @click="addQuantity">+</b-btn>
//           </b-input-group-append>
//         </b-input-group>
//       </div>