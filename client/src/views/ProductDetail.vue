<template>
  <div class="product-detail">
    {{description}}
  </div>
</template>

<script>
export default {
  name: 'product-detail',
  data() {
    return {
    }
  },

  methods: {
    getProductDetail: async function() {
      try {
        await axios({
          method: 'get',
          url: '/products/' + this.$route.params.id,
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(({ data }) => {
          // this.transaction = data.transaction
          this.$store.commit('FETCH_A_TRANSACTION', data.transaction)
        })

      } catch (error) {
        console.log(error)
        this.danger(error.response.data.messages[0])
      }
    }
  }
}
</script>

<style acoped>
.product-detail {
  background-color: white;
  max-width: 83vw;
  border-radius: 5px;
  padding: 25px 75px 25px 50px;
}
</style>