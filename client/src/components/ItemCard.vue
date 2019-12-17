<template>
   <router-link :to="{name: 'ItemDetail', params: {itemId: item._id}}">
      <div id="card-container"
         class="flex flex-col py-5 px-4 mt-8 rounded">
         <div>
            <img class="object-cover" :src="item.image" :alt="item.name"/>
         </div>
         <p class="mt-2 py-1 leading-normal">{{item.name}}</p>
         <p class="py-1 leading-normal">Price: {{item.price}}</p>
      </div>
   </router-link>
</template>

<script>
export default {
   name: 'ItemCard',
   props: {
      item: {
         type: Object,
         required: true
      }
   },
}
</script>

<style scoped>
   #card-container {
      background-color: #dae2e6;
   }
   
   p {
      color: #393e46;
   }

   img {
      height: 20rem;
      width: 17rem;
   }
</style>