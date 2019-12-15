<template>
  <div>
     <!-- loop cards of of items -->
     <!-- <ItemCard v-for="item in items"
     :key="item._id"
     :item="item"
     /> -->

     <div v-for="item in items" :key="item._id">{{item.name}}</div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'
import ItemCard from '@/components/ItemCard.vue'

export default {
   name: 'ItemList',
   components: {
      ItemCard
   },
   methods: {
      ...mapActions({
         fetchItems: 'item/fetchItems',
         checkSignedIn: 'user/checkSignedIn'
      })
   },
   created() {
      this.checkSignedIn()
      console.log('check signin ke invoke')
      this.fetchItems()
   },
   computed: {
      ...mapGetters({
         items: 'item/getItems'
      })
   },
}
</script>

<style>

</style>