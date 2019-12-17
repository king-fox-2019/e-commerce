<template>
  <!-- <div class="col-lg-4 col-md-6 mb-4"> -->
  <div class="single-products-catagory card-imgg">
    <!-- <div class="card h-100"> -->
    <a @click="toProductDetails(ProductData)">
      <img class="card-img-top" :src="ProductData.image" alt />
      <div class="hover-content">
        <div class="line"></div>
        <p style="font-size: 13px">IDR {{ProductData.price.toLocaleString()}}</p>
        <h4 style="font-size: 17px">{{ ProductData.name }}</h4>
      </div>
    </a>
    <!-- </div> -->
  </div>
  <!-- </div> -->
  <!-- <div>
    <div class="my-2 addproduct productpic producttext border-0 card bg-dark text-white">
      <img :src="product.image" class="card-img" alt="..." />
      <div v-on:click.prevent="getSinglePage(product._id)" class="ovl px-3 py-3 card-img-overlay">
        <div class="row no-gutters">
          <div class="col-9">
            <h5 class="producttext text-dark card-title">{{product.name}}</h5>
            <br />
            <p class="producttext text-dark card-text">{{product.price}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>-->
</template>



<script>
export default {
  name: "ProductCard",
  props: ["ProductData"],
  methods: {
    toProductDetails(ProductData) {
      console.log(ProductData);
      this.$router.push(`/products/${ProductData._id}`);
    }
  }
};

// export default {
//   props: ["product"],
//   data() {
//     return {};
//   },
//   methods: {
//     getSinglePage(id) {
//       this.$emit("getsinglepage", id);
//     }
//   },
//   name: "ProductBlock"
// };
</script>

<style>
.card-imgg {
  object-fit: cover !important;
  /* height: 500px; */
  /* width: 250px; */
  /* margin: 10px auto; */
  /* max-width: 120px; */
}
.card-img-top {
  width: 300px;
  height: 380px;
  object-fit: fill;
}
/* #circleswatch {
  margin: 0;
  border-radius: 50%;
  list-style: none;
  background-image: url("");
  background-repeat: no-repeat;
  background-position: left center;
  background-size: 40px;
}

#addproduct {
  width: 50%;
  border-style: 1px solid rgb(214, 210, 210) !important;
  border-radius: 22px;
}

.productpic:hover button {
  background-color: rgb(214, 208, 208);
}

.productpic:hover h5 p {
  text-transform: underline;
}

.productpic:hover {
  transition: 0.4s all;
  opacity: 0.9;
}

.productpic:hover img {
  background: url("");
}

.producttext {
  list-style: none;
  display: inline-block;
}

.producttext {
  position: relative;
  font-size: 20px;
  font-weight: 500;
  overflow: hidden;
  transition: 0.4s all;
}

.producttext:before {
  content: "";
  width: 60px;
  position: absolute;
  border-bottom: 2px solid #313131;
  bottom: 0;
  right: 350px;
  transition: 0.4s all;
}

.producttext:hover:before {
  right: 0;
} */

.single-products-catagory {
  position: relative;
  z-index: 1;
  width: 33.33333%;
  height: 333px;
  top: 0;
  object-fit: cover !important;
}
@media only screen and (min-width: 992px) and (max-width: 1199px) {
  .single-products-catagory {
    width: 50%;
  }
}
@media only screen and (min-width: 768px) and (max-width: 991px) {
  .single-products-catagory {
    width: 100%;
  }
}
@media only screen and (max-width: 767px) {
  .single-products-catagory {
    width: 100%;
  }
}
@media only screen and (min-width: 576px) and (max-width: 767px) {
  .single-products-catagory {
    width: 50%;
  }
}
.single-products-catagory a {
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
  object-fit: contain;
  z-index: 10;
}
.single-products-catagory a::after {
  -webkit-transition-duration: 250ms;
  transition-duration: 250ms;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  content: "";
  background-color: rgba(60, 60, 60, 0.7);
  z-index: 1;
  opacity: 0;
  visibility: visible;
}
.single-products-catagory a img {
  width: 100%;
}
.single-products-catagory .hover-content {
  position: absolute;
  top: 40px;
  left: 40px;
  z-index: 10;
}
@media only screen and (max-width: 767px) {
  .single-products-catagory .hover-content {
    top: 30px;
    left: 30px;
  }
}
.single-products-catagory .hover-content .line {
  width: 80px;
  height: 3px;
  background-color: #fbb710;
  display: block;
  margin-bottom: 15px;
}
.single-products-catagory .hover-content p {
  font-size: 16px;
  color: #6d6d6d;
  line-height: 1;
  margin-bottom: 5px;
  -webkit-transition-duration: 250ms;
  transition-duration: 250ms;
}
.single-products-catagory .hover-content h4 {
  margin-bottom: 0;
  -webkit-transition-duration: 250ms;
  transition-duration: 250ms;
}
.single-products-catagory:hover a::after,
.single-products-catagory:focus a::after {
  opacity: 1;
  visibility: visible;
}
.single-products-catagory:hover .hover-content p,
.single-products-catagory:hover .hover-content h4,
.single-products-catagory:focus .hover-content p,
.single-products-catagory:focus .hover-content h4 {
  color: #fff;
}
.main-content-wrapper
  .single-product-area
  .single_product_desc
  .product-meta-data
  .line {
  width: 80px;
  height: 3px;
  background-color: #fbb710;
  margin-bottom: 15px;
  display: block;
}

.single-products-catagory .hover-content .line {
  width: 80px;
  height: 3px;
  background-color: #fbb710;
  display: block;
  margin-bottom: 15px;
}

.single-product-wrapper .product-description .product-meta-data .line {
  width: 80px;
  height: 3px;
  background-color: #fbb710;
  margin-bottom: 15px;
  display: block;
}
</style>
