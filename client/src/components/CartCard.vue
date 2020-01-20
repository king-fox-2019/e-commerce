<template>
  <b-row class="border my-2 d-flex justify-content-between">
    <b-col class="d-flex justify-content-between align-items-center">
      <b-media>
      <template v-slot:aside>
        <b-img :src="item.productId.image" width="64" alt="placeholder"></b-img>
      </template>

      <h5 class="mt-0">{{ item.productId.name }}</h5>
      <span class="mb-0">
        {{ item.productId.description }}
      </span>
      <br>
      <span>
        {{ item.amount }} x {{ item.productId.price }} = {{ item.amount * item.productId.price }}
      </span>
      </b-media>
      <b-button
        class="float-right"
        size="sm"
        @click.prevent="removeCart(item.productId._id)"
      >Remove
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'CartCard',
  props: ['item'],
  methods:{
    removeCart () {
      this.$emit('removeCart')
    }
  }
}
</script>

<style>

</style>