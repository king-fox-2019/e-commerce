<template>
  <div id="app">
    <div id="nav">
      <router-link to="/order/pendingpayment">Pending Payment</router-link> |
      <router-link to="/order/pendingdeivery">Pending Delivery</router-link> |
      <router-link to="/order/delivered">Delivered</router-link> |
      <router-link to="/order/received">Received</router-link>
    </div>
    <router-view/>
  </div>
</template>
<style lang="css" scoped>
    #app{
        width:100%
    }
</style>
