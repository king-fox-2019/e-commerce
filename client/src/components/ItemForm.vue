<template>
  <div>
    <div class="row mt-5 ml-5 mr-5">
    <div class="col-md-5">
      <img :src="image">
    </div>
    <div class="col-md-2"></div>
    <div class="col-md-5 text-break">
      <p><b>{{this.name}}</b></p>
      <p>{{this.description}}</p>
      <p>Rp. {{this.price}}</p>
      <p>Stock: {{this.stock}}</p>
        <button type="submit" class="btn btn-primary mr-3" @click.prevent='addToCart'>Add to Cart</button>
        <button type="submit" class="btn btn-primary" @click.prevent='back'>Back</button>
    </div>
    
  </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
let baseUrl = 'http://localhost:3000'
export default {

  name: 'ItemForm',

  data () {
    return {
      name: '',
      image: '',
      description: '',
      price: 0,
      stock: 1
    }
  },
  props: {
    itemData: Object
  },
  methods: {
    addToCart(){
      axios({
        method: 'post',
        url: baseUrl + '/item/cart/' + this.$route.params.id,
        headers: {
          access_token: localStorage.getItem('token')
        }
      })
        .then((response) => {
          console.log(response)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    back(){
      this.$router.push('/item')
    }
  },
  watch:{
    itemData(){
      this.name = this.itemData.name
      this.image = this.itemData.image
      this.description = this.itemData.description
      this.price = this.itemData.price
      this.stock = this.itemData.stock
    }
  }
}
</script>

<style lang="css" scoped>
  img{
    width: 100%;
  }
</style>