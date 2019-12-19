<template>
  <div class="AdminPage">
    <div class="container">

      <div class="row">

        <div class="col-lg-3 mt-4">
          <div class="container shadow" style="height: 200px; width: 200px; display: flex; align-items: center; background-image: radial-gradient(pink, yellow, lavender, palegreen, blue, violet);  border-radius: 50%; padding: 10px;">
            <img src="../assets/geomancy-1.png" alt="Logo" style="margin: 0 auto;"/>
          </div>
          <hr>
          <b-button variant="info" @click.prevent="addProduct"> <i class="far fa-plus-square"></i> Add A Product </b-button>
          <hr>
          <b-button variant="info" @click.prevent="viewTransactions"> <i class="fas fa-receipt"></i> Transaction List </b-button>
          <hr>
          <b-button variant="info" @click.prevent="viewChart"> <i class="fas fa-chart-line"></i> Statistics </b-button>
          <hr>
        </div>

        <div class="col-lg-9">
          <router-view></router-view>
        </div>

      </div>
      <!-- end of main row div -->
    </div>
    <!-- end of container div -->
  </div>
</template>

<script>

export default {
  name: 'AdminPage',
  methods: {
    addProduct () {
      this.$router.push('/admin/addProduct')
    },
    viewTransactions () {
      this.$router.push('/admin/transactions')
    },
    viewChart () {
      this.$router.push('/admin/chart')
    }
  }
}
</script>

<style scoped>
.AdminPage {
  height: 100vh;
  overflow: scroll;
}
</style>
