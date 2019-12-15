<template>
  <div class="single-product-area section-padding-100 clearfix">
            <div class="row">
                <div class="col-12 col-lg-7">
                    <a class="gallery_img" :href="product.image">
                        <img class="d-block" :src="product.image" alt="First slide" width="600px">
                    </a>
                </div>
                <div class="col-12 col-lg-5">
                    <div class="single_product_desc">
                        <div class="product-meta-data">
                            <div class="line"></div>
                            <p class="product-price">Rp. {{product.price}}</p>
                            <a>
                                <h6>{{product.name}}</h6>
                            </a>
                            <p class="avaibility">Stock : {{product.stock}}</p>
                        </div>
                        <div class="short_overview my-5">
                            <p>{{product.description}}</p>
                        </div>
                        <form class="cart clearfix" @submit.prevent="addToCart">
                            <div class="cart-btn d-flex mb-50">
                                <p>Qty</p>
                                <div class="quantity">
                                    <span class="qty-minus" onclick="var effect = document.getElementById('qty'); var qty = effect.value; if( !isNaN( qty ) &amp;&amp; qty &gt; 1 ) effect.value--;return false;"><i class="fa fa-caret-down" aria-hidden="true"></i></span>
                                    <input type="number" v-model="amount"  class="qty-text" id="qty" step="1" min="1" max="300" name="quantity" value="1">
                                    <span class="qty-plus" :onclick="`var effect = document.getElementById('qty'); var qty = effect.value; if( !isNaN( qty )&amp;&amp; qty &lt; ${product.stock}) effect.value++;return false;`"><i class="fa fa-caret-up" aria-hidden="true"></i></span>
                                </div>
                            </div>
                            <button type="submit" name="addtocart" value="5" class="btn amado-btn">Add to cart</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'detail',
  data(){
      return{
          product : {},
          amount : 1
      }
  },
  methods: {
    fetchProduct(){
        console.log('uy')
        let id = this.$route.params.id
        axios({
            url:`http://localhost:3000/product/${id}`,
            method:'get',
            headers:{
                access_token : localStorage.access_token
            }
        })
            .then(({data})=> {
                this.product = data
            })
            .catch(err=>{
                console.log(err)
                this.$router.push('/notfound')
            })
    },
    addToCart(){
        axios({
            url:'http://localhost:3000/user',
            method:'put',
            data:{
                product : this.$route.params.id,
                amount : this.amount
            },
            headers:{
                access_token : localStorage.access_token
            }
        })
            .then(({data}) => {
                this.$store.dispatch('fetchCart')
                this.amount = 0;
                swal({
                    title: "product added to your cart",
                    icon: "success",
                    });
            })
            .catch(console.log)
    }
  },
  created(){
      this.fetchProduct()
  }
}
</script>
<style scoped>

</style>