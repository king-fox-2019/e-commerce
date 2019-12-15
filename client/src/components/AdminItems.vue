<template>
  <div class="container">
    <item-list :items="items"></item-list>
  </div>
</template>

<script>
import ItemList from '@/components/ItemList'

export default {
  components: {
    'item-list': ItemList
  },
  computed: {
    items() {
      return this.$store.state.items
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  padding-top: 5.7rem;
}
</style>
