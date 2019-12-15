<template>
  <div class="product-list">
      <figure class="image">
      <img @click="redirect(product._id)" :src="product.imageSource" alt="Product image">
      </figure>
      <div class="product-info">
      <h4 style="font-family: 'Gelasio', serif; font-weight: 900; font-size: 22px; letter-spacing: 1px;"><Strong>{{product.name}}</Strong></h4>
      <p style="font-size: 15px; font-family: 'Josefin Sans', sans-serif; letter-spacing: 1px;">{{itemPrice}}</p>
      </div>
  </div>
</template>

<script>
export default {
  props: ['product'],
  methods: {
    redirect (id) {
      this.$router.push(`/collections/${id}`)
    }
  },
  computed: {
    itemPrice () {
      return `IDR ${this.product.price.toLocaleString()}`
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Gelasio&display=swap');
@import url('https://fonts.googleapis.com/css?family=Abel|Barlow|Josefin+Sans|Varela+Round&display=swap');
.container-product {
  display: flex;
  flex-direction: row;
  align-items: left;
}
img {
  /* object-fit: cover; */
  height: 50vh !important;
  width: 50vh !important;
}
.product-info {
  text-align: left;
  padding-top: 10px;
  padding-left: 20px;
}
/*
font-family: 'Varela Round', sans-serif;
font-family: 'Josefin Sans', sans-serif;
font-family: 'Barlow', sans-serif;
font-family: 'Abel', sans-serif;
 */

</style>
