<template>
<div class="col-12 pl-0 pr-0" style="overflow-y: scroll; height: 94.9vh;">
    <hr class="mb-0 mt-0">
    <table class="table table-dark">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Product</th>
          <th scope="col">Size</th>
          <th scope="col">Quantities</th>
          <th scope="col">Total Price</th>
          <th scope="col">Status</th>
          <th scope="col">Options</th>
        </tr>
      </thead>
      <tbody v-for="(item,index) in mycart" :key="index">
        <tr>
          <th scope="row">{{ index + 1 }}</th>
          <td>{{item.productId.name}}</td>
          <td>{{item.size[0].size}}</td>
          <td>{{item.quantities}}</td>
          <td>Rp.{{ item.price }}</td>
          <td>{{ item.status }}</td>
          <td>
            <button type="button" class="btn btn-primary btn-sm" v-if="item.status == 'oncart'" @click="checkout(item._id, `process`)">BUY</button>
            <button type="button" class="btn btn-primary btn-sm disabled" v-if="item.status == 'process'">ON PROCESS</button>
            <button type="button" class="btn btn-primary btn-sm" v-if="item.status == 'confirm'" @click="checkout(item._id, `complete`)">CONFIRM</button>
            <button type="button" class="btn btn-success btn-sm focus" v-if="item.status == 'complete'">SUCCESS TRANSACTION</button>
            <button type="button" class="btn btn-success btn-sm ml-2" :data-target="'#modeld'+index" v-if="item.status == 'oncart'" data-toggle="modal" @click="updated(item.size[0]._id,item.quantities)">UPDATE</button>
            <button type="button" class="btn btn-danger btn-sm ml-2" @click.prevent="deleted(item._id)" v-if="item.status == 'oncart'">DELETE</button>
          </td>
        </tr>
        <!-- Modal -->
        <div class="modal fade center" :id="'modelId'+index" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
          <div class="modal-dialog modal-lg" role="document">
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
        <!-- ---------- -->
        <!-- Modal -->
      <div class="modal fade" :id="'modeld'+index" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title" style="color: black; font-weight: bolder;">{{ item.productId.name }}</h3>
              <h3 class="modal-title ml-4" style="color: black; font-weight: bolder;">
                <button type="button" class="btn btn-primary"> Size  {{ item.size[0].size }}</button>
              </h3>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body p-0" v-for="(image, index) in item.productId.image" :key="index">
              <img v-if="index == 0" :src="image" alt="" style="width:100%">
            </div>
            <div class="modal-footer" >
              <button type="button" @click="minus" class="btn m-0 btn-primary">
                <i class="fas fa-minus-circle"></i>
              </button>
              <button type="button" class="btn btn-primary m-0 focus">{{ jumlah }}</button>
              <button type="button" @click="plus" class="btn m-0 btn-primary">
                <i class="fas fa-plus-circle"></i>
              </button>
              <button type="button" class="btn btn-info mx-auto" v-if="jumlah != 0">Price Rp. {{Number(item.price) * Number(jumlah) }}</button>
              <button type="button" class="btn btn-info mx-auto" v-else>Price Rp. {{Number(item.price)}}</button>
              <button type="button" class="btn btn-success" data-dismiss="modal" @click="updatedProduct(item._id,(Number(item.price) * Number(jumlah)),item.price, item.quantities)">Update</button>
            </div>
          </div>
        </div>
      </div>
        <!-- ---- -->
      </tbody>
    </table>
</div>
</template>

<script>
import { mapState } from 'vuex'
import Swal from 'sweetalert2'
import axios from '../../apis/axios'
export default {
  data() {
    return {
      minimal: 0,
      jumlah: 0,
      maksimal: 0,
      size: 0
    }
  },
  methods: {
    plus(){
      if (this.jumlah < this.maksimal) {
        this.jumlah++
      }
    },
    minus(){
      if (this.jumlah != this.minimal) {
        this.jumlah--
      }
    },
    updated(id,quantities){
      axios({
        url : `/cart/${id}/stock`,
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data })=>{
        console.log(data);
        this.maksimal = Number(data.cart.stock) - Number(quantities)
        this.size = data.cart.size
        this.minimal = -Number(quantities)
      })
      .catch(error=>{
        console.log(error);
      })
    },
    deleted(id){
      axios({
        url: `/cart/${id}`,
        method: 'DELETE',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        this.$store.dispatch('getMyCart')
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
    updatedProduct(id, price, originalPrice, quantities){
      let money
      if (price > originalPrice) {
        money = Number(price) + Number(originalPrice)
      } else if ( originalPrice > price ){
        money = Number(originalPrice) + Number(price)
      }
    let form = {
        quantities: this.jumlah + Number(quantities),
        price:  Number(originalPrice) + Number(price),
        size: this.size
      }
      axios({
        url: `/cart/${id}`,
        method: 'PATCH',
        data : form,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data})=>{
        console.log(data);
        this.$store.dispatch('getMyCart')
      })
      .catch(error=>{
        console.log(error);
      })
    },
    checkout(id, status){
      console.log(id, status);
      let form = { status }
      axios({
        url: `/cart/${id}/status`,
        method: 'PATCH',
        data : form,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data})=>{
        console.log(data);
        this.$store.dispatch('getMyCart')
      })
      .catch(error=>{
        console.log(error);
      })
    }
  },
  created() {
    this.$store.dispatch('getMyCart')
  },
  computed: mapState(['mycart'])
}
</script>

<style>
  
</style>
