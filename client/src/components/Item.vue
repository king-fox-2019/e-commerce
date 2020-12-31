<template>
  <div class="product container mt-3">
    <b-card-group class="justify-content-center" deck>
      <div v-for="(product,i) in this.listProducts" :key="i">
        <b-card
          :img-src="product.image"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 15rem;"
          class="mb-3 mt-3 card"
        >
          <b-card-text>
            <h2>{{product.name}}</h2>
            <p>price: {{product.price}}</p>
            <p>stock: {{product.stock}}</p>
            <div v-if="isLogin">
              Quantity: <input type="number" min="1" :max="product.stock" :value="quantity" @input="quantity = $event.target.value">
            </div>
          </b-card-text>
          <div v-if="isLogin">
            <b-button href="#" variant="outline-primary" @click.prevent="addToCart(product,quantity)">Add To Cart</b-button>
          </div>
        </b-card>
      </div>
    </b-card-group>
  </div>
</template>

<script>
import { mapActions,mapGetters,mapState } from 'vuex'

export default {
  data(){
    return{
      quantity: null
    }
  },
  methods: {
    ...mapActions({getProducts:'product/getProducts',
                   addCart:'cart/addToCart'}),
    addToCart (product,quantity) {
      if (!localStorage.getItem('access_token')) {
        this.$router.push({ path: '/login' })
      }else{
        product.quantity=quantity
        this.addCart(product)
        this.$swal({
          type: 'success',
          title: 'Success',
          text: 'Added To Cart',
          timer: 1000,
          showConfirmButton: false
        })
      }
    }
  },
  computed: {
    ...mapGetters({listProducts:'product/listProducts'}),
    ...mapState(['isLogin'])
  },
  // watch: {
  //   isLogin(newValue,oldValue){
  //     console.log(newValue,oldValue)
  //     if(newValue===false){
  //       this.login=newValue
  //       console.log(this.login)
  //     } 
  //   }
  //},
  created(){
    this.getProducts()
  }
}
</script>

<style>
.card {
  transition: 0.3s;
}

.card:hover {
  transform: scale(1.1);
  transition: 0.3s;
}
</style>
