<template>
  <div class="home">
    <Navbar class="fixed-top" style="background-color:white"/>
    <SliderPage style="margin-top:100px" v-if="!this.$store.state.userRole"/>
    <div class="welcomegif">
      <img style="margin-top:100px" src="../assets/greeting.gif" fluid alt="Responsive image" srcset="">

    </div>
    <ProductPage/>
    <FooterPage/>

  </div>
</template>

<script>
// @ is an alias to /src

import SliderPage from '@/components/SliderPage.vue'
import Navbar from '@/components/Navbar.vue'
import ProductPage from '@/components/Product.vue'
import FooterPage from '@/components/FooterPage.vue'

export default {
  name: 'home',
  components: {
    SliderPage,
    Navbar,
    ProductPage,
    FooterPage
  },
  data() {
  }
}
</script>
