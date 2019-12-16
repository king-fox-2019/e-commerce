<template>
  <div class="flex flex-wrap justify-around">
     <item-card v-for="item in items"
     :key="item._id"
     :item="item"
   />
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'
import ItemCard from '@/components/ItemCard.vue'

export default {
   name: 'ItemList',
   components: {
      'item-card': ItemCard
   },
   methods: {
      ...mapActions({
         fetchItems: 'item/fetchItems',
      })
   },
   created() {
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

<style scoped>
   div {
      justify-content: space-evenly;
   }
</style>