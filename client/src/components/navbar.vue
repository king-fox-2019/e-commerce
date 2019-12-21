<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand to="/" style="font-family: 'Lilita One', cursive;">CS.SKINS</b-navbar-brand>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/products" style="font-family: 'Lobster', cursive;">Products</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template v-slot:button-content>
            <em @click="fetchCart">User</em>
          </template>
          <section v-show="status">
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item id="show-btn" @click="$bvModal.show('bv-modal-example')">
              Cart
            </b-dropdown-item>
            <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
          </section>
          <section v-show="!status">
              <b-dropdown-item to="/login">Login/Register</b-dropdown-item>
          </section>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
    <div>
      <b-modal id="bv-modal-example" hide-footer>
        <template v-slot:modal-title>
        </template>
        <div class="d-block text-center">
          <h3>My cart</h3>
          <b-table striped hover :items="cart" :fields="fields"></b-table>
        </div>
        <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Close Me</b-button>
      </b-modal>
    </div>
  </b-navbar>
</template>

<script>
import axios from '../../api/server';

export default {
  name: 'navbar',
  props: {
    status: {
      type: Boolean,
    },
  },
  data() {
    return {
      query: '',
      fields: ['name', 'price', 'qty'],
      cart: {},
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$emit('localstorage');
      this.$swal('See you soon!');
    },
    fetchCart() {
      axios
        .get('cart')
        .then(({ data }) => {
          this.cart = data.products;
          console.log(this.cart);
        })
        .catch(() => {
          this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong, try again!',
          });
        });
    },
  },
};
</script>

<style scoped>
</style>
