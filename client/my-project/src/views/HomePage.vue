<template>
    <div style="">
    <!-- <h1>filename: HomePage.vue</h1> -->

    <div class="container">
        <div class="row row-cols-1 row-cols-md-4 ">
            <div v-for="product in dataProduct" :key=product>
                <ProductDisplay :product="product"/>   
            </div>
        </div>
    </div>


    </div>
</template>

<script>

import ProductDisplay from '@/components/ProductDisplay'
import axios from 'axios'
import Swal from 'sweetalert2'
import { mapGetters } from 'vuex'

export default {
    
    name: 'homepage',
    components:{
        ProductDisplay,
    },
    methods:{
        
    },
    mounted(){
        this.$store.dispatch('fetchingData')
    },
    computed:{
        ...mapGetters([
            'isLogin',
            'role',
            'dataProduct'
        ])
    }
    
    // created()
    //   {
    //         axios({
    //               method: 'get',
    //               url: 'http://localhost:3000/products'
    //           })
    //           .then(result=>{
    //           console.log("TCL: result", result)
    //           })
    //           .catch(err=>{
    //               console.log('TCL \n============\n ', err.response)
    //               Swal.fire(
    //                   'Error Request',
    //               )
    //           })
    //   }
}
</script>



<style scoped>


.card
{
    max-width: 25rem;
}

.card-title
{
    font-weight: bold
}

.card-text
{
    font-size: 15px
}

.text-sm-left
{
    font-size: 18px
}

.price-tag
{
    font-weight: bold;
    color: red
}
</style>