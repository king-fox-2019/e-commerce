<template>
  <div class="col-lg-4 col-md-6">
    <div class="product text-center">
      <div class="flip-container">
        <a href="#">
          <img :src="product.image" alt class="img-fluid" />
        </a>
      </div>
      <a href="#" class="invisible">
        <img src="img/product1.jpg" alt class="img-fluid" />
      </a>
      <div class="text">
        <h3>
          <a href="#">{{product.name}}</a>
        </h3>
        <p class="price">
          <del></del>${{product.price}}.00
        </p>
        <p class="buttons">
          <router-link :to="`products/${product._id}`">
            <a href="#" class="btn btn-outline-secondary">View detail</a>
          </router-link>
          <a href="#" class="btn btn-primary d-none">
            <i class="fa fa-shopping-cart"></i>Add to cart
          </a>
        </p>
      </div>
      <!-- /.text-->
    </div>
    <!-- /.product            -->
  </div>
</template>

<script>
export default {
  name: 'ProductItem',
  props: ['product']
}
</script>

<style>
</style>
