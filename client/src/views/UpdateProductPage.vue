<template>
  <div class="update-product-page">
      <UpdateProductForm></UpdateProductForm>
  </div>
</template>

<script>
import UpdateProductForm from '../components/UpdateProductForm'

export default {
  name: 'UpdateProductPage',
  components: {
    UpdateProductForm
  }
}
</script>

<style>
.update-product-page {
  height: 100vh;
  overflow: scroll;
}
</style>
