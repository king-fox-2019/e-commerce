<template>

<div class="container" style="padding:100px;max-width: 1600px; display:flex; flex-wrap: wrap;">
    
     <div v-for="(product, index) in products" :key="index" class="product-page" style="width:20rem; margin:70px;">
         <b-card
            no-body
            style="width:20rem;max-heigth: 300px; border-radius: 1.25rem;box-shadow: 15px 6px 47px -13px rgba(0,0,0,0.25);;border:none"
            img-alt="Image"
            img-top
        >
        <b-card-img :src="product.images[0]" style="top:-80px;height:370px;width:auto;position:absolute" class="rounded-0"></b-card-img>
            <b-card-body style="padding-left:50px;padding-right:50px">
            <b-card-title style="margin-top:270px;font-size:22px; font-family:'Bebas Neue';color:black;" >{{product.name.split('-')[0]}}</b-card-title>
            <b-card-sub-title class="mb-4" style="font-size:42px; font-family:'Bebas Neue';color:#383838">{{product.name.split('-')[1]}}</b-card-sub-title>
            <b-card-text>
                {{product.description.slice(0,80)}}...<a href="#" class="card-link">more</a>
            </b-card-text>
            </b-card-body>
                <hr>

            <b-card-body style="padding-left:50px;padding-right:50px;margin-bottom:20px">
            <b-card-sub-title class="mb-4" style="font-size:24px; font-family:'Bebas Neue';">idr.{{product.price}}</b-card-sub-title>
            <b-button pill variant="primary" size="sm"><i class="fas fa-cart-plus" style="margin-right:10px"></i> Add to cart</b-button>
            <b-button v-if="userRole" pill variant="primary" size="sm" style="margin-left:10px"> delete </b-button>
            <!-- <p>{{this.$store.state.isLogin}}</p> -->
            </b-card-body>
        </b-card>
    
    </div>
    


</div>
   

</template>



<script>
import { mapState } from 'vuex'
export default {
    name:'home',
    computed : mapState(['products', 'userRole']),
  
    created() {
        if(localStorage.getItem('role')==='admin'){
            this.$store.commit('CHANGE_ROLE',true)
        }else{
            this.$store.commit('CHANGE_ROLE',false)
        }
        this.$store.dispatch('fetchProduct')
    },
}
</script>

<style>
.card-img-top {
    width: 120%;
    border-top-left-radius: calc(0.25rem - 1px);
    border-top-right-radius: calc(0.25rem - 1px);
}



</style>