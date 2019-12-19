<template>
  <b-card-group id="item-list" columns>
    <b-card
      v-for="item in items"
      :key="item._id"
      :title="item.name"
      :sub-title="item.price | formatCurrency"
      sub-title-text-variant="danger"
      :img-src="item.image"
      :img-alt="item.image"
      img-top
      @click="$router.push(`/items/${item._id}`)"
    >
      <b-card-text class="small text-muted"
        >Stock: {{ item.stock }}</b-card-text
      >
    </b-card>
  </b-card-group>
</template>

<script>
export default {
  props: ['items']
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/main.scss';

#item-list {
  width: 90%;
  margin: 0 auto;
  margin-top: 6rem;

  .card {
    cursor: pointer;
    img {
      transition: all 0.5s ease;
      &:hover {
        transform: scale(1.2);
      }
    }
  }
}

@include media-breakpoint-up(md) {
  #item-list {
    width: 80%;
  }
}
</style>
