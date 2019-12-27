<template>
  <div>
    <TopNavbar />
    <h1 v-if='itemList.length == 0'>No item in cart</h1>
    <div class="card-group m-3">
      <div v-for='item in itemList' class="card" style="width: 18rem;">
        <img class="card-img-top" :src='item.image'>
        <div class="card-body">
          <h5 class="card-title">{{item.name | lengthLimit}}</h5>
          <router-link :to="'/item/'+item._id" class="btn btn-secondary">Detail</router-link>
        </div>
      </div>  
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import TopNavbar from '../components/TopNavbar.vue'
let baseUrl = 'http://localhost:3000'
export default {

  name: 'MyCart',
  components: {
    TopNavbar
  },
  data () {
    return {
      itemList: []
    }
  },
  created(){
    axios({
      method: 'get',
      url: baseUrl + '/item/cart',
      headers: {
        access_token: localStorage.getItem('token')
      }
    })
      .then((items) => {
        this.itemList = []
        for (let item of items.data){
          this.itemList.push(item.ItemId)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  filters: {
    lengthLimit(text){
      if (!text){
        return
      }
      if (text.length > 10){
        return text.slice(0, 10) + '...'
      }
      return text
    }
  }
}
</script>

<style lang="css" scoped>
.card{
  min-width: 25%;
  max-width: 25%;
}
</style>