<template>
  <div>
    <TopNavbar />
    <h2>Items for Sale</h2>
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import TopNavbar from '@/components/TopNavbar.vue'

export default {
  name: 'Home',
  components: {
    TopNavbar
  }
}
</script>
