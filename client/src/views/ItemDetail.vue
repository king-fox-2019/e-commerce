<template>
  <div id="detail-container" class="flex flex-col my-10 px-8 items-center w-full">
      <div id="wrapper" class="rounded">
         <img :src="currentItem.image" :alt="currentItem.name" class="object-cover w-full rounded"/>
         <div class="px-10 py-3">
            <h1 class="text-2xl">{{currentItem.name}}</h1>
            <p class="text-base leading-normal">{{currentItem.description}}</p>
            <div id="cart-wrapper" class="py-1 flex justify-start pl-4 mt-2 mb-2">
               <label>Add to cart:</label>
               <input type="text" v-model="quantity" class="mx-2 px-2 bg-transparent"><a @click.prevent="addToCart" class="cursor-pointer px-1 hover:text-green-600"><i class="fas fa-shopping-cart"></i></a>
            </div>
         </div>
     </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import axios from '../../apis/server'

export default {
   name: 'ItemDetail',
   data() {
      return {
         quantity: 1
      }
   },
   computed: {
      // ...mapGetters({
      //    getOneItem: 'item/getOneItem'
      // }),
      // item: function() {
      //    this.getOneItem(this.$router)
      // }
      // ...mapState('item', ['currentItem'])
      ...mapGetters({
         currentItem: 'item/getCurrentItem'
      })
   },
   methods: {
      // fetchItem() {
      //    axios({
      //       url: `/item/${this.$route.params.itemId}`,
      //       method: 'get'
      //    })
      //    .then(({data}) => {
      //       this.item = data.item
      //    })
      //    .catch(error => console.log(error))
      // }
      ...mapActions('item', ['fetchCurrentItem']),
      ...mapActions('user', ['fetchUserData']),

      addToCart() {
         axios({
            url: `/buyer/addToCart`,
            method: `patch`,
            headers: {
               access_token: localStorage.getItem(`access_token`)
            },
            data: {
               itemId: this.$route.params.itemId,
               quantity: this.quantity
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
      }
   },
   created() {
      // this.fetchItem()
      this.fetchCurrentItem(this.$route.params.itemId)
   }
}
</script>

<style scoped>
   #detail-container {
      
   }

   #wrapper {
      width: 90%;
      background-color: #dae2e6;
      color: #393e46;
   }

   #cart-wrapper {
      
   }

   img {
      height: 61.8vh;
   }

   input[type="text"] {
      width: 5rem;
      border-bottom: 1px solid #393e46;
      outline-style: none;
   }
</style>