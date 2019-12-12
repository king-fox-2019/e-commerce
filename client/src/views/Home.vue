<template>
  <div class="home">
    
    <SliderPage v-if="!this.$store.state.userRole"/>
    <div class="welcomegif">
      <img src="../assets/greeting.gif" fluid alt="Responsive image" srcset="">
    </div>
    <ProductPage/>
    

  </div>
</template>

<script>
// @ is an alias to /src

import SliderPage from '@/components/SliderPage.vue'
import ProductPage from '@/components/Product.vue'


export default {
  name: 'home',
  components: {
    SliderPage,
    ProductPage,
  
  },
  data: function(){
    return {

    }
  }
}
</script>

<style scoped>
  img{
    margin-top:100px;
    width:100%
  }
  SliderPage{
    margin-top:100px
  }
</style>
