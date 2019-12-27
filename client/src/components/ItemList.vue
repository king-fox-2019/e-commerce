<template>
  <div class="card-group m-3">
    <div v-for='item in itemList' class="card" style="width: 18rem;">
      <img class="card-img-top" :src='item.image'>
      <div class="card-body">
        <h5 class="card-title">{{item.name | lengthLimit}}</h5>
        <router-link :to="'/item/'+item._id" class="btn btn-secondary">Detail</router-link>
      </div>
    </div>  
  </div>
</template>

<script>
import axios from 'axios'
let baseUrl = 'http://localhost:3000'
export default {

  name: 'ItemList',

  data () {
    return {
      itemList: []
    }
  },
  created(){
    axios({
      method: 'get',
      url: baseUrl + '/item'
    })
      .then((items) => {
        this.itemList = items.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  filters: {
    lengthLimit(text){
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