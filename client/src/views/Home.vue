<template>
  <div>
    <TopNavbar />
    <h2>Items for Sale</h2>
    <ItemList />
  </div>
</template>

<script>
// @ is an alias to /src
import TopNavbar from '@/components/TopNavbar.vue'
import ItemList from '@/components/ItemList.vue'

export default {
  name: 'Home',
  components: {
    TopNavbar,
    ItemList
  }
}
</script>
