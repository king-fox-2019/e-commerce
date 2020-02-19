<template>
<div class="col-10 pl-0 pr-0" style="overflow-y: scroll; height: 94.9vh;">
    <!-- {{ stockTotal }} -->
    <!-- <h1 class="mt-3 text-center">HELLO ANGGA</h1> -->
    <hr class="mb-0">
    <table class="table table-dark">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Product</th>
          <th scope="col">Size</th>
          <th scope="col">Stock Total</th>
          <th scope="col">Price</th>
          <th scope="col">Sold</th>
          <th scope="col">Options</th>
        </tr>
      </thead>
      <tbody v-for="(item,i) in listItem" :key="i">
        <tr>
          <th scope="row">{{ i+1 }}</th>
          <td>{{item.name}}</td>
          <td>
            <div class="dropdown">
              <button class="btn btn-sm btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Size
              </button>
              <div class="dropdown-menu p-0" aria-labelledby="dropdownMenuButton" v-for="(option,i) in item.size" :key="i">
                <div class="d-flex flex-row">
                  <button type="button" class="btn btn-sm btn-primary">Size {{ option.size }}</button>
                  <button type="button" class="btn btn-sm btn-primary ml-auto px-3">{{ option.stock }}pcs</button>
                </div>
              </div>
            </div>
          </td>
          <td>{{ stockTotal[i] }}pcs</td>
          <td>Rp.{{ item.price }}</td>
          <td>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle btn-sm" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Sold
              </button>
              <div class="dropdown-menu p-0" aria-labelledby="dropdownMenuButton" v-for="(option,i) in item.size" :key="i">
                <div class="d-flex flex-row">
                  <button type="button" class="btn btn-sm btn-primary">Size {{ option.size }}</button>
                  <button type="button" class="btn btn-sm btn-primary ml-auto px-3">{{ option.sold }}pcs</button>
                </div>
              </div>
            </div>
          </td>
          <td>
            <button type="button" class="btn btn-success btn-sm" :data-target="'#modeId'+i" data-toggle="modal">Update Stock</button>
            <button type="button" class="btn btn-primary btn-sm ml-2" :data-target="'#modelId'+i" data-toggle="modal">Images</button>
            <button type="button" class="btn btn-danger btn-sm ml-2" @click.prevent="deleted(item._id)">Delete</button>
          </td>
        </tr>
        <!-- Modal -->
        <div class="modal fade" :id="'modelId'+i" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
          <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h3 class="modal-title" style="color: black; font-weight: bolder;">{{ item.name }}</h3>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="modal-body p-0" v-for="(image, index) in item.image" :key="index">
                <img :src="image" alt="" style="width:100%">
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        <!-- -------- -->
        <div class="modal fade" :id="'modeId'+i" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h3 class="modal-title" style="color: black; font-weight: bolder;">{{ item.name }}</h3>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="modal-body p-0" v-for="(image, index) in item.image" :key="index">
                <img v-if="index == 0" :src="image" alt="" style="width:100%">
              </div>
              <div class="modal-footer" v-for="(option) in item.size" :key="option._id">
                <div class="form-group">
                  <small id="helpId" class="form-text text-muted">Update Stock</small>
                <input v-model="stock" type="number" min="0" class="text-center form-control selectProductNumber ml-3" name="" id="" aria-describedby="helpId" :placeholder="stockTotal[i]">
                </div>
                <button type="button" class="btn btn-success ml-4 mt-4" @click="UpdateStock(option._id)" data-dismiss="modal">Updated</button>
                <button type="button" class="btn btn-secondary ml-4 mt-4" data-dismiss="modal">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </tbody>
    </table>
</div>
</template>

<script>
import { mapState } from 'vuex'
import Swal from 'sweetalert2'
import axios from '../../apis/axios'
export default {
  data(){
    return{
      stock: ''
    }
  },
  methods: {
    UpdateStock(id){
      axios({
        url: `product/${id}/stock`,
        method: 'PATCH',
        data: {
          stock: this.stock
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        this.$store.dispatch('getListItem')
      })
      .catch(error => {
        Swal.fire({
          title: 'Error!',
          text: error.response.data,
          icon: 'error',
          // imageWidth: 400,
          // imageHeight: 200,
          timer: 2500,
          imageAlt: 'Custom image',
          showConfirmButton: false,
          showCancelButton: false,
          confirmButtonText: 'نعم',
          cancelButtonText: 'لا'
        })
      })
    },
    deleted(id){
      axios({
        url: `/product/${id}`,
        method: 'DELETE',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        this.$store.dispatch('getListItem')
      })
      .catch(error => {
        console.log(error)
        Swal.fire({
          title: 'Error!',
          text: error.response.data.errors.join(' | '),
          icon: 'error',
          // imageWidth: 400,
          // imageHeight: 200,
          timer: 2500,
          imageAlt: 'Custom image',
          showConfirmButton: false,
          showCancelButton: false,
          confirmButtonText: 'نعم',
          cancelButtonText: 'لا'
        })
      })
    },
  },
  created() {
    this.$store.dispatch('getListItem')
  },
  computed: mapState(['listItem','stockTotal'])
}
</script>

<style>

</style>
