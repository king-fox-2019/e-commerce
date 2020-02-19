<template>
  <div class="container">
      <div style="width:auto; height:50px; position: absolute; z-index: 9; left:320px; padding: 5px;">
        <a class="btn amado-btn" @click="prevPage">Previous</a>
        <a class="btn amado-btn" @click="nextPage"> Next</a>
      </div>
      <div class=" clearfix" style="margin-top: 50px;">
        <div class="amado-pro-catagory clearfix" style="display: flex; flex-wrap: wrap;align-items:flex-start;">
            <productItem v-for="(current, id) in currents" :key="id" :singleProduct="current"/>           
        </div>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import productItem from '../components/productItem'
import {mapState} from 'vuex'
export default {
  name: 'home',
  components: {
      productItem
  },
  data(){
      return{
        pageNumber: 0,
        size:6,
        currents : [],
      }
  },
  computed:mapState(['productList']),
  methods: {
    nextPage(){
      this.pageNumber++;
      this.currentProduct()
    },
    currentProduct(){
      const start = this.pageNumber * this.size
      const end = start + this.size;
      let product = this.productList
      this.currents = product.slice(start, end);
    },
    prevPage(){
      this.pageNumber--;
      this.currentProduct()
    }
  },
  created(){
    this.$store.dispatch('fetchProduct')
    this.$emit('cekLogin')
  },
  watch:{
      productList(value){
          this.currentProduct()
      }
  }
}
</script>

<style>
@import url(../assets/css/core-style.css);
</style>
