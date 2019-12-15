<template>
    <div style="">
        <!-- <h1>filename : ViewCartPage.vue</h1> -->
        <h1>View Cart</h1>
        
    <div class="container">
    <div style="display:flex;justify-content:center">
        <b-card no-body class="" style="width: 75vw;height:90vh; overflow:auto">
        <b-row no-gutters>
            <b-col md="6">
            <div style="margin-top:5%">
                <div v-for="cart in userCart" :key=cart>
                    <CartProduct :cart="cart"/>
                </div>
            </div>
            </b-col>

            <b-col md="6">
            <b-card-body>
                <CartTotal/>
            </b-card-body>
            </b-col>
        </b-row>
        </b-card>
    </div>
    </div>    
    


    
    </div>


</template>





<script>
import CartTotal from '@/components/CartTotal';
import CartProduct from '@/components/CartProduct'
import axios from 'axios'
import Swal from 'sweetalert2'
import { mapGetters } from 'vuex'

export default {
    name: 'viewCartPage',
    components:{
        CartTotal,
        CartProduct
    },
    mounted(){
        axios({
            method: 'get',
            url: 'http://localhost:3000/carts',
            headers:{
                access_token: localStorage.getItem('access_token')
            }
        })
        .then(result=>{
            console.log("TCL: mounted -> result @views/viewCartPage", result)
            this.$store.commit('SET_USER_CART', result.data)
        })
        .catch(err=>{
            console.log("TCL: mounted -> err @views/viewCartPage", err)
        })
    },
    computed:{
        ...mapGetters([
            'userCart'
        ])
    }
        





}
</script>



<style>


</style>