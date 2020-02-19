<template>
<div class="col-10 pl-0 pr-0" style="overflow-y: scroll; height: 94.9vh;">
    <!-- <h1 class="mt-3 text-center">HELLO ANGGA</h1> -->
    <hr class="mb-0">
    <table class="table table-dark">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">product</th>
          <th scope="col">price</th>
          <th scope="col">size</th>
          <th scope="col">quantities</th>
          <th scope="col">Options</th>
        </tr>
      </thead>
      <tbody v-for="(item,i) in data" :key="i">
        <tr>
          <th scope="row">{{ i+1 }}</th>
          <td>{{item.userId.name}}</td>
          <td>
            {{ item.productId.name }}
          </td>
          <td>Rp.{{ item.price }}</td>
          <td>{{ item.size[0].size }}</td>
          <td>{{ item.quantities }}</td>
          <!-- <td>Rp.{{ item }}</td> -->
          <td>
            <button type="button" class="btn btn-primary btn-sm" @click="checkout(item._id,'confirm')">DELIVERY</button>
            <button type="button" class="btn btn-danger btn-sm ml-2" @click.prevent="deleted(item._id)">CANCEL</button>
          </td>
        </tr>
        <!-- Modal -->
        <div class="modal fade center" :id="'modelId'+i" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
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
      </tbody>
    </table>
</div>
</template>

<script>
import { mapState } from 'vuex'
import Swal from 'sweetalert2'
import axios from '../../apis/axios'
export default {
  name: 'member',
  data() {
    return {
      data: []
    }
  },
  methods: {
    checkout(id, status){
      let form = { status }
      axios({
        url: `/cart/${id}/status/admin`,
        method: 'PATCH',
        data : form,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data})=>{
        console.log(data);
        this.fatchData()
      })
      .catch(error=>{
        console.log(error);
      })
    },
    fatchData(){
      axios({
        url: `/cart/process`,
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        console.log(data);
        this.data = data.cart
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
    deleted(id){
      axios({
        url: `/user/${id}`,
        method: 'DELETE',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        this.fatchData()
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
    this.fatchData()
  },
  computed: mapState([])
}
</script>

<style>

</style>
