<template>
  <div id="item-detail">
    <div class="row" id="item-wrapper">
      <div class="col-12 col-md-5">
        <div class="ml-5 my-3">
          <b-img class="border" :src="item.image" fluid-grow rounded></b-img>
        </div>
      </div>
      <div class="col p-0">
        <div class="my-3" style="margin-left: 2.4rem;">
          <h1 class="mb-0">{{ item.name }}</h1>
          <p class="text-muted mb-4">Stock left: {{ item.stock }}</p>
          <small
            class="text-muted"
            style="text-decoration: line-through gray;"
            >{{ item.price | mockDiscount | formatCurrency }}</small
          >
          <h3 class="text-danger">{{ item.price | formatCurrency }}</h3>
          <div class="d-flex flex-wrap mt-3">
            <b-button variant="danger" v-if="onSession">Button</b-button>
            <b-button
              variant="primary"
              v-else
              :to="`/session?from=${$route.fullPath}&on=signin`"
              >Sign In and Add to Cart</b-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      item: {}
    }
  },
  computed: {
    onSession() {
      return this.$store.state.user.onSession
    }
  },
  filters: {
    mockDiscount(val) {
      if (!val) return 0
      return (100 / 60) * val
    }
  },
  created() {
    this.$store.dispatch('FETCH_USER_DATA')
    this.$store.dispatch('GET_ITEM_DETAIL', this.id).then(({ data }) => {
      this.item = data.data
    })
  }
}
</script>

<style lang="scss" scoped>
#item-detail {
  height: 100%;

  #item-wrapper {
    padding-top: 5.7rem;
    // background-color: #02010a;
  }
}
</style>
