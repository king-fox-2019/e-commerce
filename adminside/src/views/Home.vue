<template>
<div class="main-panel">
  <div class="container-fluid">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header card-header-primary">
          <h4 class="card-title ">Product data</h4>
          <b-button v-b-modal.modal-1>Add Product</b-button>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table">
              <thead class=" text-primary">
                <th>
                </th>
                <th>
                  Name
                </th>
                <th>
                  Price
                </th>
                <th>
                  Description
                </th>
                <th>
                  Options
                </th>
              </thead>
              <tbody>
                <tr v-for="(product, id) in products" :key="id">
                  <td>
                    <img :src="product.image" width="135px"><br>
                    <b-button variant="primary" @click="fetchEditPicture(id)" size="sm" v-b-modal.modal-3>change picture</b-button>
                  </td>
                  <td>
                    {{product.name}}
                  </td>
                  <td>
                    Rp. {{product.price}}
                  </td>
                  <td>
                    {{product.description}}
                  </td>
                  <td>
                    <b-button variant="success" @click="fetchEdit(id)" size="sm" v-b-modal.modal-2>edit</b-button><br>
                    <b-button variant="danger" @click="deleteProduct(product._id)" size="sm">delete</b-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <b-modal id="modal-1" size="lg" title="Add new Product" :hide-footer="true">
    <form @submit.prevent="addProduct">
      <b-form-input v-model="add_title" placeholder="Enter Product name" required></b-form-input><br>
      <b-form-input v-model="add_price" :type="'number'" placeholder="Enter Product price" required></b-form-input><br>
      <b-form-input v-model="add_stock" :type="'number'" placeholder="Enter Product stock" required></b-form-input><br>
      <b-form-textarea
        id="textarea"
        v-model="add_description"
        placeholder="Enter product description"
        rows="3"
        max-rows="6" required
      ></b-form-textarea><br>
      <b-form-file
        v-model="add_file"
        :state="Boolean(add_file)"
        placeholder="Choose image for product"
        drop-placeholder="Drop file here..."
      ></b-form-file>
      <b-button variant="primary" size="sm" :type="'submit'">Add product</b-button>
    </form>
  </b-modal>
  <b-modal id="modal-2" size="lg" title="Add new Product" :hide-footer="true">
    <form @submit.prevent="editProduct">
      <b-form-input v-model="edit_title" placeholder="Enter Product name" required></b-form-input><br>
      <b-form-input v-model="edit_price" :type="'number'" placeholder="Enter Product price" required></b-form-input><br>
      <b-form-input v-model="edit_stock" :type="'number'" placeholder="Enter Product stock" required></b-form-input><br>
      <b-form-textarea
        id="textarea"
        v-model="edit_description"
        placeholder="Enter product description"
        rows="3"
        max-rows="6" required
      ></b-form-textarea><br>
      <b-button variant="primary" size="sm" :type="'submit'">Edit product</b-button>
    </form>
  </b-modal>
  <b-modal id="modal-3" size="lg" title="Add new Product" :hide-footer="true">
    <form @submit.prevent="changePicture">
      <b-form-file
        v-model="edit_file"
        :state="Boolean(edit_file)"
        placeholder="Choose image for product"
        drop-placeholder="Drop file here..."
      ></b-form-file>
      <b-button variant="primary" size="sm" :type="'submit'">Change Picture</b-button>
    </form>
  </b-modal>
</div>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
Vue.use(BootstrapVue)
export default {
  name: 'home',
  data(){
    return{
      products:[],
      add_title:'',
      add_price:'',
      add_stock:'',
      add_description:'',
      add_file:false,
      edit_id:'',
      edit_title:'',
      edit_price:'',
      edit_stock:'',
      edit_description:'',
      edit_file:false,
    }
  },
  methods:{
    fetchProduct(){
      axios({
        url:'http://localhost:3000/product',
        method:'get',
        headers:{
          access_token : localStorage.access_token
        }
      })
        .then(({data}) => {
          this.products = data
        })
        .catch(console.log)
    },
    addProduct(){
      let form = new FormData()
      form.append('name', this.add_title)
      form.append('price', this.add_price)
      form.append('description', this.add_description)
      form.append('stock', this.add_stock)
      form.append('file', this.add_file)
      axios({
        url:'http://localhost:3000/product',
        method:'post',
        data:form,
        headers:{
          access_token : localStorage.access_token
        }
      })
        .then(({data}) => {
          this.$bvModal.hide('modal-1')
          this.fetchProduct()
        })
        .catch(console.log)
    },
    fetchEdit(id){
      this.edit_id = this.products[id]._id
      this.edit_title = this.products[id].name
      this.edit_price = this.products[id].price
      this.edit_stock = this.products[id].stock 
      this.edit_description = this.products[id].description 
    },
    fetchEditPicture(id){
      this.edit_id = this.products[id]._id
    },
    changePicture(){
      let form = new FormData()
      form.append('file', this.edit_file)
      axios({
        url:`http://localhost:3000/product/${this.edit_id}`,
        method:'patch',
        data:form,
        headers:{
          access_token : localStorage.access_token
        }
      })
        .then(({data}) => {
          this.$bvModal.hide('modal-3')
          this.fetchProduct()
        })
        .catch(console.log)
    },
    deleteProduct(id){
      swal({
        title: "Are you sure?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          axios({
            url:`http://localhost:3000/product/${id}`,
            method:'delete'
          })
          .then(({data}) => {
            swal("Product deleted!", {
              icon: "success",
            });
            this.fetchProduct()
          })   
        }
      }); 
    },
    editProduct(){
      axios({
        url: `http://localhost:3000/product/${this.edit_id}`,
        method:'put',
        data:{
          name : this.edit_title,
          price: this.edit_price,
          stock: this.edit_stock,
          description : this.edit_description
        },
        headers:{
          access_token : localStorage.access_token
        }
      })
        .then(({data}) => {
          this.$bvModal.hide('modal-2')
          this.fetchProduct()
        })
        .catch(console.log)
    }
  },
  created(){
    this.fetchProduct()
  }
}
</script>
