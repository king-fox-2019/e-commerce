<template>
  <section id="home">
    <div class=" products-display">
      <div
        v-if="currentUser.role === 'admin'"
        class="add-product-button button is-white"
        @click="isFormAddProductActive = true"
      >Add a product</div>

      <b-modal
        :active.sync="isFormAddProductActive"
        has-modal-card
        trap-focus
        aria-role="dialog"
        aria-modal
      >
        <FormAddProduct
          @close-form-add-product="closeFormAddProduct"
          />
      </b-modal>

      <div class="product-card-group-container" 
        v-for="(productGroup, i) in productsBy5" :key="i"
        >
        <ProductCardGroup 
          :product-group="productGroup" 
          />
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import ProductCardGroup from "../components/ProductCardGroup";
import FormAddProduct from "../components/FormAddProduct";

export default {
  data: () => ({
    isFormAddProductActive: false,
    products: []
  }),

  methods: {
    chunkArrayInGroups: function(arr, size) {
      var myArray = [];
      for (var i = 0; i < arr.length; i += size) {
        myArray.push(arr.slice(i, i + size));
      }
      return myArray;
    },
    closeFormAddProduct: function() {
      this.isFormAddProductActive = false
      this.$store.dispatch('fetchAllProducts')
    }
  },

  mounted() {
    if (localStorage.getItem('access_token')) {
      this.$store.dispatch("fetchCurrentUser");
    }
    this.$store.dispatch("fetchAllProducts");
    // console.log("mounted dan dispatched");
  },

  components: {
    ProductCardGroup,
    FormAddProduct
  },

  computed: {
    productsBy5() {
      const result = this.chunkArrayInGroups(this.allProducts, 6);
      return result;
    },
    ...mapState(["allProducts", "currentUser"])
  }
};
</script>

<style scoped>

.products-display {
  margin: 2vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 100px;
}

.add-product-button {
  width: 300px;
}

.product-card-group-container {
  display: flex;
  align-items: center;
}

.column {
  padding: 0;
}
</style>