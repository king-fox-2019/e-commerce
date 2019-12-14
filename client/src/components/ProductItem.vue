<template>
  <div class="col-lg-4 col-md-6">
    <div class="product text-center">
      <div class="flip-container">
        <a href="detail.html">
          <img src="https://i.postimg.cc/CLV6HTMB/product1.jpg" alt class="img-fluid" />
        </a>
      </div>
      <a href="detail.html" class="invisible">
        <img src="img/product1.jpg" alt class="img-fluid" />
      </a>
      <div class="text">
        <h3>
          <a href="detail.html">{{product.name}}</a>
        </h3>
        <p class="price">
          <del></del>${{product.price}}.00
        </p>
        <p class="buttons">
          <a href="detail.html" class="btn btn-outline-secondary">View detail</a>
          <a href="basket.html" class="btn btn-primary">
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
