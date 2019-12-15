<template>
  <div>
    <b-card class="card">
      <b-card-text>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col"></th>
              <th scope="col">Price</th>
              <th scope="col">Add Item</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in data" :key="item.id">
              <th>
                <img :src="item.image" class="image-item">
              </th>
              <td>{{ item.name }} -
                <br> {{ item.weight }} gr
                <div class="mt-3">
                  <a href="#" @click.prevent="showModal(item)" class="card-link">View Details</a>
                </div>
              </td>
              <td>Rp. {{item.price.toLocaleString("id")}}</td>
              <td><b-button variant="success" @click.prevent="addCart(item)">
                <i class="fas fa-cart-plus"></i></b-button></td>
            </tr>
            <Modal :data="item" />
          </tbody>
        </table>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import Modal from './ModalDetail.vue';

export default {
  components: {
    Modal,
  },
  name: 'GoldPurchase',
  data() {
    return {
      cart: [],
      item: null,
    };
  },
  methods: {
    addCart(id) {
      this.cart.push(id);
      this.$store.commit('SET_CART_EB', this.cart);
    },
    showModal(data) {
      this.item = data;
      this.$bvModal.show('modal-lg');
    },
  },
  computed: {
    data() {
      return this.$store.state.emasBatang;
    },
  },
  created() {
    this.$store.dispatch('fetchDataBatang');
  },
};
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px !important;
  border: none;
  text-align: left;
}

.image-item {
  width: 120px
}

.form-control {
  width: 75px;
}

.form-control:hover, .form-control:focus {
  border-color: #cb9b2d !important;
  box-shadow: none !important
}

.card-link {
  color: #cb9b2d !important;
  font-weight: bold;
  font-size: 12px;
}
.card-link:hover {
  color: #23427e !important;
  font-weight: bold
}

</style>
