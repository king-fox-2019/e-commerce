<template>
  <div class="bg-home-page">
    <div class="button-shop">
      <div style="text-align:center;color:white;">
        <h1 style="font-size:50px">Welcome to SShop!</h1>
        <h2 style="font-size:30px">Enjoy your shopping, get your special price!</h2>
      </div>
      <div>
        <button
          @click.prevent="movePage('shop-page')"
          class="massive ui inverted button btn-shop"
          style="border-radius: 0px;margin-top:30px"
        >Shop Now</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    movePage (page) {
      if (page === 'shop-page') {
        this.$router.push('/products')
      }
    }
  }
}
</script>

<style>
.button-shop {
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.bg-home-page {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  background-image: url("https://images.unsplash.com/photo-1494026222377-872a605b54ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80");
}
.btn-shop {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
