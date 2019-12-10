<template>
  <div class="home">
    <carousel/>
  </div>
</template>

<script>
// @ is an alias to /src
import carousel from '@/components/carousel.vue';

export default {
  name: 'home',
  components: {
    carousel,
  },
};
</script>
<style scoped>
</style>
