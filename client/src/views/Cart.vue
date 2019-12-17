<template>
  <div class="flex justify-center items-center">
     <div class="flex flex-col mx-2 white-background p-4 mt-10 rounded max-w-3xl">
        <h2 class="text-2xl dark-color font-bold">
           {{cartItems.length != 0 ? 'This is your cart' : 'Your cart is empty'}}
        </h2>
        <div class="mt-3 p-3 orange-border rounded" v-for="(cartItem, index) in cartItems" :key="cartItem.item._id">
           <router-link class="text-xl font-semibold my-2" :to="{name: 'ItemDetail', params: cartItem.item._id}">{{cartItem.item.name}}</router-link>
           <div class="my-2">
               <span class="text-lg">Quantity</span>
               <input type="text" class="bg-transparent mx-3" :placeholder="cartItem.quantity"/>
               <a @click.prevent="addToCart(cartItem._id, cartItem.quantity)" class="cursor-pointer px-1"><i class="fas fa-shopping-cart"></i></a>
           </div>
        </div>

        <i @click="checkout" class="fas fa-cash-register text-4xl mt-4 dark_color self-center"></i>
     </div>

     
     <router-view />
  </div>
</template>

<script>
import axios from '../../apis/server'
import {mapGetters, mapActions} from 'vuex'

export default {
   name: 'cart',
   computed: {
      ...mapGetters({
         cartItems: 'user/getUserCart'
      })
   },
   created() {
      this.fetchUserData()
   },
   methods: {
      ...mapActions('user', ['fetchUserData']),

      addToCart(itemId, quantity) {
         console.log(itemId, quantity)
         axios({
            url: `/buyer/addToCart`,
            method: `patch`,
            headers: {
               access_token: localStorage.getItem(`access_token`)
            },
            data: {
               itemId,
               quantity
            }
         })
         .then(() => {
            this.fetchUserData()

            this.$swal({
               type: 'success',
               title: 'Add to cart success'
            })
         })
         .catch(({response}) => {
            // console.log(response.data.message)
            this.$swal({
               type: 'error',
               title: 'Add to cart failed',
               text: response.data.message
            })
         })
      },

      checkout() {
         axios({
            url: '/buyer/checkoutCart',
            method: 'patch',
            headers: {
               access_token: localStorage.getItem('access_token')
            }
         })
         .then(() => {
            this.$swal({
               type: 'success',
               title: 'Add to cart success'
            })

            this.$router.push({name: 'checkout'})
         })
         .catch(({response}) => {
            this.$swal({
               type: 'error',
               title: 'Checkout failed',
               text: response.data.message
            })
         })
      }
   },
   // components: {
      
   // }
}
</script>

<style scoped>
   .white-background {
      background-color: #eeeeee;
   }

   .dark_color {
      color: #222831;
   }

   .orange-border {
      border: 1px #b55400 solid;
   }

   a:hover, i:hover {
      color: #b55400;
      cursor: pointer;
   }

   input {
      border-bottom: 1px solid #222831;
      max-width: 7rem;
      outline-style: none;
   }

   input:focus {
      border-color: #b55400;
   }
</style>