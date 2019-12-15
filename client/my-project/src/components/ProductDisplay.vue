<template>
        <div class="col mb-4" >
            <!-- <h5> filename: components/ProductDisplay.vue </h5> -->
            <!-- <h5>{{ product._id }}</h5> -->
            <b-card> 
                <div  style="overflow: hidden;">
                <!-- ini kalo mau refer ke local folder -->
                <!-- <img :src="require('@/assets/headset (1).jpg')" alt="image" style="width:auto; height:210px; "> -->
                <!-- ini kalo mau refer dynamically by proop -->
                <img :src="product.imageUrl" alt="image" style="width:auto; height:210px; ">
                </div>
                <b-container style="margin-top:20px">
                <b-card-title> {{ product.name }}</b-card-title>
                </b-container>
                <b-card-text>
                    {{ product.description }}
                </b-card-text>
                <b-list-group flush>
                    <b-list-group-item style="color:red; font-weight:bold">Rp {{ product.price }}</b-list-group-item>
                    <b-list-group-item>{{ product.quantity }} in stock</b-list-group-item>
                </b-list-group>
                <b-container fluid style="margin-top:11px">
                        <b-form-input type="number" min=0 style="width:100px; margin:auto; text-align:center" v-if="role === 'buyer'" v-model="quantity"></b-form-input><!-- muncul kalau login sebagai buyer-->
                </b-container>
                <div class="card-body" style="padding:10px">
                <a href="#" class="card-link" v-if="role === 'seller'">Edit Detail</a> <!-- muncul kalau login sebagai seller-->
                <a href="#" class="card-link" v-if="role === 'buyer'" @click.prevent="addToCart">Add to Cart</a> <!-- muncul kalau login sebagai buyer-->
                </div>
                <div class="card-footer">
                    <small class="text-muted">{{ product.SellerId.username }}</small>
                </div>
            </b-card>
        </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Swal from 'sweetalert2'
import axios from 'axios'

export default {

    name: 'ProductDisplay',
    props:[
        'product'
    ],
    data: function(){
        return {
            quantity: null
        }
    },
    methods:{
        addToCart()
          {
              if(!this.quantity)
                {
                    Swal.fire({
                        title:'quantity min 1',
                        icon:'info'
                    })
                }
              else
                {
                    const processedQuantity = this.quantity
                    const transactionType = 'purchase'

                    axios({
                        method: 'post',
                        url: 'http://localhost:3000/carts/',
                        headers:{
                            access_token: localStorage.getItem('access_token')
                        },
                        data:{
                            ProductId: this.product._id,
                            quantity: this.quantity,
                            processedQuantity,
                            transactionType,
                        }
                    })
                    .then(result=>{
                        console.log("TCL: result", result)
                        Swal.fire(
                            'Add to Cart',
                            'success',
                            'success'
                        )
                        this.$store.dispatch('fetchingData')
                    })
                    .catch(err=>{
                        console.log('TCL \n============\n err addtocart', err)
                    })
                }
          }
    },
    computed:{
        ...mapGetters([
            'role'
        ])
    }
    


}


</script>

<style>

</style>