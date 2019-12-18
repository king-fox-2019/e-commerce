<template>
  <b-form @submit.prevent="sentAmount">
    <b-input-group size="sm">
      <b-form-input v-model="amount" />
      <b-input-group-append>
        <b-button variant="info" type="submit">Add to Cart</b-button>
      </b-input-group-append>
    </b-input-group>
  </b-form>
</template>

<script>
export default {
  name: "AddToCartButton",
  data: function() {
    return {
      amount: 1
    };
  },
  methods: {
    sentAmount() {
      this.$emit("addToCart", this.amount);
    }
  }
};
</script>
