<template>
  <div>
    <Highlight v-if="showHighlight"></Highlight>
    <DetailProduct></DetailProduct>
  </div>
</template>

<script>
import Highlight from '../components/Highlight'
import DetailProduct from '../components/DetailProduct'

export default {
  name: 'detail-product-page',
  data () {
    return {
      showHighlight: true
    }
  },
  components: {
    Highlight,
    DetailProduct
  }
}
</script>

<style></style>
