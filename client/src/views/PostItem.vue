<template>
  <div>
    <TopNavbar />
    <ItemFormPost />
  </div>
</template>

<script>
// @ is an alias to /src
import TopNavbar from '@/components/TopNavbar.vue'
import ItemFormPost from '@/components/ItemFormPost.vue'

export default {
  name: 'PostItem',
  components: {
    TopNavbar,
    ItemFormPost
  }
}
</script>
