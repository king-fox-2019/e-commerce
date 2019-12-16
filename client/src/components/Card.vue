<template>
  <div id="contain">
    <b-card
      no-body
      style="max-width: 20rem;"
      :img-src="productData.image"
      img-alt="Image"
      img-height="175px"
      img-top
    >
      <b-card-body>
        <b-card-title>{{productData.name}}</b-card-title>
        <b-card-text>{{productData.description}}</b-card-text>
      </b-card-body>

      <b-list-group flush>
        <hr />
        <b-list-group-item>Rp. {{productData.price}}</b-list-group-item>
        <b-list-group-item v-if="this.$route.name !== 'cart'">Qty. {{productData.quantity}}</b-list-group-item>
      </b-list-group>

      <b-card-body v-if="!this.$store.state.userID && this.$route.name !== 'cart'">
        <span :id="productData._id" class="d-inline-block" tabindex="0">
          <b-button variant="outline-secondary" style="pointer-events: none;" disabled>Add to Cart</b-button>
        </span>
        <b-tooltip :target="productData._id">Login required for this feature</b-tooltip>
      </b-card-body>
      <b-card-body v-if="this.$store.state.userID && this.$route.name !== 'cart'">
        <b-button
          variant="primary"
          class="card-link"
          @click.prevent="addToCart"
        >Add to Cart</b-button>
      </b-card-body>
      <b-card-body v-if="this.$store.state.userID && this.$route.name == 'cart'">
        <b-button
          variant="outline-danger"
          class="card-link"
          @click.prevent="removeFromCart"
        >Remove</b-button>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import swal from "sweetalert2";
import axios from "axios";

export default {
  name: "Card",
  data() {
    return {};
  },
  props: ["productData"],
  methods: {
    addToCart() {
      console.log("asd", this.productData._id, localStorage.getItem('access_token'));
      axios({
        url: `http://localhost:3000/users/${this.productData._id}`,
        method: "patch",
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(({ data }) => {
          console.log(data);
          swal.fire(`${this.productData.name} added to cart`)
        })
        .catch(error => {
          console.log(error.message);
        });
    },
    removeFromCart() {
      axios({
        url: `http://localhost:3000/users/${this.productData._id}`,
        method: "put",
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(({ data }) => {
          swal.fire(`${this.productData.name} remove to cart`)
          this.$store.dispatch('fetchCart')
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scopred>
* {
  outline: none;
}
#contain {
  margin: 10px;
}
.card-body {
  max-height: 150px;
}
</style>