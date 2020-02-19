<template>
<div class="cart-table-area section-padding-100">
    <div style="width:auto; height:50px; position: absolute; z-index: 9; left:5%; padding: 5px;">
        <router-link to="/cart" class="btn amado-btn" style="width:500px;">Cart</router-link>
        <router-link to="/cart/transaction" class="btn amado-btn" style="width:500px;">Transaction</router-link>
      </div>
      <br>
    <router-view/>
</div>
</template>

<script>
export default {
    name: 'cart',
}
</script>

<style>

</style>