<template>
  <div class="container">
    <div class="row">
      <sidebar class="col-md-3"></sidebar>
      <div class="col-md-8">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar'
export default {
  data: function () {
    return {
    }
  },
  components: {
    Sidebar
  }
}
</script>

<style scoped>
</style>
