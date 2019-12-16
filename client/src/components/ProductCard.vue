<template>
  <mdb-card id="product-card" class>
    <mdb-view hover>
      <a href="#!">
        <!-- {{product}} -->
        <mdb-card-image :src="product.imageUrl" alt="Card image cap" class="image"></mdb-card-image>
        <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
      </a>
    </mdb-view>
    <mdb-card-body>
      <h6 class="font-weight-bold indigo-text py-2">{{ product.name }}</h6>
      <mdb-card-title>{{ product.author }}</mdb-card-title>
      <mdb-card-text>Price: Rp{{ product.price.toLocaleString('id') }}</mdb-card-text>
      <mdb-card-text>Stock: {{ product.qty }}</mdb-card-text>
      <div class="add-to-cart columns is-desktop is-vcentered">

        <!-- FOR CUSTOMER -->
        <div v-if="currentUser.role === 'customer'" 
          class="column"
          >
          <button @click="addToCart(product._id)" class="button is-primary">Add to cart</button>
        </div>
        <div v-if="currentUser.role === 'customer'" 
          class="column"
          >
          <b-field label>
            <b-numberinput
              v-model="productInputQty"
              min="1"
              :max="product.qty"
              controls-position="compact"
              controls-rounded
            ></b-numberinput>
          </b-field>
        </div>

        <!-- FOR ADMIN -->
        <button v-if="currentUser.role === 'admin'"
          class="my-2 button is-text"
          >
          <b-icon icon="delete"
            @click.native="confirmDelete"
            :id="product._id"
            type="is-primary"
            size="is-medium"
          ></b-icon>
        </button>

        <!-- HANDLE UPDATE FORM MODAL LATER -->
        <!-- <button class="update-button is-pulled-right button is-primary"
          :id="product._id"
          v-if="currentUser.role === 'admin'"
          @click="isFormUpdateProductActive = true"
          >Update</button>

        <b-modal
          :active.sync="isFormUpdateProductActive"
          has-modal-card
          trap-focus
          aria-role="dialog"
          aria-modal
          >
          <FormUpdateProduct
            :product="product"
            @close-form-add-product="closeFormUpdateProduct"
            />
        </b-modal> -->

      </div>
    </mdb-card-body>
  </mdb-card>
</template>

<script>
import toastMixin from '../mixins/toastMixin'
import FormUpdateProduct from '../components/FormUpdateProduct'
import {
  mdbCard,
  mdbCardImage,
  mdbCardBody,
  mdbCardTitle,
  mdbCardText,
  mdbView,
  mdbMask
} from "mdbvue"

import axios from "../../config/axios";
import { mapState } from 'vuex';

export default {
  name: "product-card",

  props: ["product"],

  data: () => ({
    productInputQty: 1,
    isFormUpdateProductActive: false
  }),

  methods: {
    addToCart(productId) {
      axios({
        method: "post",
        url: `/carts/products/${productId}/${this.productInputQty}`,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(({ data }) => {
          this.success(data.message);
        })
        .catch(err => {
          if (err.message.includes('401')) {
            this.danger('Please sign in or join first!');
            this.$router.push('/signinjoin')
          }
          else {
            console.log(err.response);
            this.danger(err.response)
          }
        });
    },

    confirmDelete: function(event) {
      // console.log('masuk confirmDelete -> ini event target id', event.currentTarget.id)
      const product_id = event.currentTarget.id;
      
      this.$buefy.dialog.confirm({
        message: "Remove this product?",
        onConfirm: async () => {
          try {
            await axios({
              method: 'delete',
              url: `/products/${product_id}`,
              headers: {
                access_token: localStorage.getItem("access_token")
              }
            })
            .then(({ data }) => {
              // console.log('ini updated cart', data);
              this.success(data.message);
              this.$store.dispatch("fetchAllProducts");
            })

          } catch (error) {

            console.log(error)
            this.danger(error.response.data.messages[0])
          }
        }
      })
    },

    showUpdateProductForm: function(event) {

    }
  },

  computed: {
    ...mapState(['currentUser'])
  },

  components: {
    mdbCard,
    mdbCardImage,
    mdbCardBody,
    mdbCardTitle,
    mdbCardText,
    mdbView,
    mdbMask,
    FormUpdateProduct
  },

  mixins: [toastMixin]
};
</script>

<style scoped>
#product-card {
  max-width: 300px;
  max-height: 500px;
  margin: 20px;
}

.add-to-cart {
  margin-top: 10px;
}
</style>