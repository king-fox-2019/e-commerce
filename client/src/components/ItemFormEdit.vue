<template>
  <div>
    <div class="row mt-5 ml-5 mr-5">
    <div class="col-md-5">
      <img :src="image">
    </div>
    <div class="col-md-2"></div>
    <div class="col-md-5">
      <form>
        <div class="form-group">
          <label>Name</label>
          <input v-model='name' type="text" class="form-control">
        </div>
        <div class="form-group">
          <label>Image</label>
          <input v-model='image' type="text" class="form-control">
        </div>
        <div class="form-group">
          <label>Description</label>
          <input v-model='description' type="text" class="form-control">
        </div>
        <div class="form-group">
          <label>Price</label>
          <input v-model='price' type="number" class="form-control">
        </div>
        <div class="form-group">
          <label>Stock</label>
          <input v-model='stock' type="number" class="form-control">
        </div>
        <button type="submit" class="btn btn-primary" @click.prevent='sell'>Edit</button>
      </form>
    </div>
    
  </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
let baseUrl = 'http://localhost:3000'
export default {

  name: 'ItemEdit',

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
    sell(){
      axios({
        method: 'post',
        url: baseUrl + '/item',
        data: {
          name: this.name,
          image: this.image,
          description: this.description,
          price: this.price,
          stock: this.stock
        },
        headers: {
          access_token: localStorage.getItem('token')
        }
      })
        .then((response) => {
          this.$router.push('/item')
        })
        .catch((err) => {
          Swal.fire(
            'Error!',
            err.response.data,
            'error'
          )        
        })
    }
  }
}
</script>

<style lang="css" scoped>
  img{
    width: 100%;
  }
</style>