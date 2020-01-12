<template>
  <form action>
    <div class="modal-card" style="max-width: 500px">
      <header class="modal-card-head">
        <p class="modal-card-title">Update a product</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Title">
          <b-input v-model="name" required></b-input>
        </b-field>

        <b-field label="Author">
          <b-input v-model="author" required></b-input>
        </b-field>

        <b-field label="Price">
          <b-input v-model="price" required></b-input>
        </b-field>

        <b-field label="Stock">
          <b-input v-model="qty" required></b-input>
        </b-field>

        <b-field label="Description">
          <b-input
            type="textarea"
            v-model="description"
          ></b-input>
        </b-field>

        <b-field class="file">
          <b-upload v-model="file">
            <a class="button is-light has-text-primary">
              <b-icon icon="upload"></b-icon>
              <span>Click to upload image</span>
            </a>
          </b-upload>
          <span class="file-name" v-if="file">{{ file.name }}</span>
        </b-field>
      </section>

      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Close</button>
        <button class="button is-primary" @click.prevent="addProduct">Submit</button>
      </footer>
    </div>
  </form>
</template>

<script>
import axios from "../../config/axios";
import toastMixin from "../mixins/toastMixin";

export default {
  name: "form-add-product",

  data: () => ({
    name: this.product.name,
    price: this.product.price,
    qty: this.product.qty,
    description: this.product.description,
    imageUrl: this.product.imageUrl,
    author: this.product.author,
    file: null
  }),

  methods: {
    addProduct: function() {
      let data = new FormData();
      data.append("image", this.file);

      axios({
        method: "post",
        url: "/products/upload-image",
        data,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(({ data }) => {
          // console.log("ini response", data);
          return axios({
            method: "POST",
            url: "/products",
            data: {
              name: this.name,
              price: this.price,
              qty: this.qty,
              description: this.description,
              imageUrl: data,
              author: this.author
            },

            headers: {
              access_token: localStorage.getItem("access_token")
            }
          });
        })
        .then(({ data }) => {
          // console.log('ini hasil post dari add product', data)
          this.$emit('close-form-add-product')
          this.toast(data.message);
        })
        .catch(err => this.danger(err.response));
    }
  },

  created() {
    console.log(this.product)
  },

  props: ["product"],

  mixins: [toastMixin]
};
</script>

<style>
</style>