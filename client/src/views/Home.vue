<template>
  <div class="home">
    <carousell></carousell>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Carousell from '../components/Carousell'
export default {
  name: 'home',
  components: {
    Carousell
  }
}
</script>
