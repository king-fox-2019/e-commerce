<template>
  <div class="single-products-catagory clearfix">
    <a @click="seeDetail(singleProduct._id)">
        <img :src="singleProduct.image" alt="">
        <div class="hover-content">
            <div class="line"></div>
            <p>Rp.{{singleProduct.price}}</p>
            <h4>{{singleProduct.name}}</h4>
        </div>
    </a>
  </div>
</template>

<script>
export default {
    props:['singleProduct'],
    methods:{
      seeDetail(aidi){
        this.$router.push(`/detail/${aidi}`)
      }
    }
}
</script>

<style>

</style>