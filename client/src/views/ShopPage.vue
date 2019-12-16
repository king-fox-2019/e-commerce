<template>
  <div>
    <div v-show="$route.path=='/products'">
      <Highlight></Highlight>
      <Products></Products>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Highlight from '../components/Highlight'
import Products from '../components/Products'

export default {
  data () {
    return {
      show: true
    }
  },
  components: {
    Highlight,
    Products
  }
}
</script>

<style></style>
