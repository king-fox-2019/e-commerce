<template>
  <mdb-card id="product-card" class>
    <mdb-view hover>
      <a href="#!">
        <mdb-card-image :src="product.product.imageUrl" alt="Card image cap" class="image"></mdb-card-image>
        <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
      </a>
    </mdb-view>
    <mdb-card-body>
      <h6 class="font-weight-bold indigo-text py-2">{{ product.product.name }}</h6>
      <mdb-card-title>{{ product.product.author }}</mdb-card-title>
      <mdb-card-text class="">
        Rp{{ product.product.price.toLocaleString('id') }} x {{product.qty}} = <strong>
          Rp{{ (product.qty * product.product.price).toLocaleString('id') }}
        </strong>
      </mdb-card-text>
      <div class="add-to-cart columns is-desktop is-vcentered">
        <div class="column"></div>
      </div>

    </mdb-card-body>
  </mdb-card>
</template>

<script>
import {
  mdbCard,
  mdbCardImage,
  mdbCardBody,
  mdbCardTitle,
  mdbCardText,
  mdbView,
  mdbMask
} from "mdbvue";

import toastMixin from "../mixins/toastMixin";

// import { mapState } from "vuex";

import axios from "../../config/axios";

export default {
  name: "product-card-cart",

  props: ["product"],

  data: () => ({
    productInputQty: null
  }),

  methods: {
    updateProductInputQty: function(event) {
      this.productInputQty = event;
      // console.log('masuk update qty', event);
    },

    updateProductQtyInCart: function(event) {
      // console.log("ini update product qty", event.target.id);
      const product_id = event.target.id;

      axios({
        method: "patch",
        url: `/carts/products/${product_id}/${this.productInputQty}`,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(({ data }) => {
          // console.log('ini updated cart', data);
          this.success(data.message);
          this.$store.dispatch("fetchMyCart");
        })
        .catch(err => {
          console.log(err);
          this.danger(err.response.data.messages[0]);
        });
    },

    confirmDelete: function(event) {
      // console.log('masuk confirmDelete -> ini event target id', event.currentTarget.id)
      const product_id = event.currentTarget.id;
      
      this.$buefy.dialog.confirm({
        message: "Remove from your cart?",
        onConfirm: async () => {
          try {
            await axios({
              method: 'delete',
              url: `/carts/products/${product_id}`,
              headers: {
                access_token: localStorage.getItem("access_token")
              }
            })
            .then(({ data }) => {
              // console.log('ini updated cart', data);
              this.success(data.message);
              this.$store.dispatch("fetchMyCart");
            })

          } catch (error) {

            console.log(error)
            this.danger(error.response.data.messages[0])
          }
        }
      })
    }
  },

  watch: {},

  computed: {
    // ...mapState({
    //   productQty: state => state.myCart.
    // })
  },

  components: {
    mdbCard,
    mdbCardImage,
    mdbCardBody,
    mdbCardTitle,
    mdbCardText,
    mdbView,
    mdbMask
  },

  mixins: [toastMixin]
};
</script>

<style scoped>
#product-card {
  max-width: 400px;
  max-height: 500px;
  margin: 20px auto;
}

.add-to-cart {
  margin-top: 10px;
}

.button {
  margin-right: 10px;
}
</style>