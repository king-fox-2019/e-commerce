<template>
  <b-col md="4" class="single-item">
    <div class="product-wrapper" @click="addToCart(product._id)">
      <img :src="product.image[0]">
      <div class="caption">
        <div class="product-name"><h4>{{ product.name }}</h4></div>
        <div>Price: {{ product.price }}</div>
        <div>Stock: {{ product.stock }}</div>
      </div>
    </div>
  </b-col>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  props: {
    product: {
      type: Object
    }
  },
  data() {
    return {

    }
  },
  methods: {
    addToCart(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "Add this item to cart?",
        imageUrl: this.product.image[0],
        imageWidth: 200,
        imageHeight: 200,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('addToCart', id )
          Swal.fire(
            'Added To Cart!',
            'Your item has been added to cart.',
            'success'
          )
        }
      })
    }
  }
}
</script>

<style>
.single-item {
  /* border: 1px dashed crimson; */
}
.product-wrapper {
  border: 1px solid #c4c4c4;
  border-radius: 4px;
  padding: 0.4rem;
  margin-bottom: 1.4rem; 
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  /* height: 474px; */
}
.product-wrapper:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  transition: 0.4s box-shadow;
}
.product-name {
  height: 4rem;
}
.product-wrapper img {
  width: 100%;
  margin-bottom: 0.6rem;
}
.caption {
  text-align: left;
  width: 100%;
}
</style>