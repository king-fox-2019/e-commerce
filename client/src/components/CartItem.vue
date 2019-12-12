<template>
  <tbody>
    <tr>
      <th scope="row" class="border-0">
        <div class="p-2">
          <img
            :src="ItemInCart.product_id.image"
            alt
            width="70"
            class="img-fluid rounded shadow-sm"
          />
          <div class="ml-3 d-inline-block align-middle">
            <h5 class="mb-0">
              <span class="text-dark d-inline-block align-middle">{{ ItemInCart.product_id.name }}</span>
            </h5>
          </div>
        </div>
      </th>
      <td class="border-0 align-middle">
        <strong>Rp. {{ ItemInCart.product_id.price }}</strong>
      </td>
      <td class="border-0 align-middle">
        <button class="btn" @click.prevent="substractCart(ItemInCart.product_id._id)">-</button>
        <strong>{{ ItemInCart.quantity }}</strong>
        <button class="btn" @click.prevent="addToCart(ItemInCart.product_id._id)">+</button>
      </td>
      <td class="border-0 align-middle">
        <b-button @click.prevent="removeFromCart(ItemInCart._id)">
          <i class="fa fa-trash"></i>
        </b-button>
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: 'CartItem',
  props: ['ItemInCart'],
  methods: {
    substractCart (ItemInCartId) {
      this.$store.dispatch('substractCart', ItemInCartId)
    },
    addToCart (ItemInCartId) {
      this.$store.dispatch('addToCartFromCartPage', ItemInCartId)
    }
  }
}
</script>

<style>
</style>
