<template>
<div>
  <app-navbar-menu/>
  <div class="row">
    <div class="col-2 p-0" style="border-right: 1px solid #E5E5E5; height:86vh">
      <button type="button" class="btn btn-lg btn-secondary btn-block">
        <i class="fas fa-shoe-prints"></i>
        Shoes
      </button>
    </div>
    <div class="col-10 mt-3" style="overflow-y: scroll;" v-for="(item,i) in listItem" :key="i">
      <div class="card" style="width: 27rem">
      <div style="height:55px; width:55px; background-color:black; position: absolute;" class="rounded-circle ml-2 mt-2">
        <div class="mt-2 pt-1">
          <span style="color: white; font-weight: bolder; font-size: 20px;">disc</span>
        </div>
      </div>
      <img :src="item.image[0]" style="height: 23rem;" alt="shoes">
      <div class="card-body">
        <div class="d-flex justify-content-between">
        <h5 class="card-title"><strong>{{item.name}}</strong></h5>
        <h5 class="card-title">Rp. {{item.price}}</h5>
        </div>
        <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> -->
        <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
        <div class="row">
          <button type="button" class="btn btn-primary active d-flex align-items-start ml-3" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
            Buy <span class="badge badge-light mt-1 ml-2">stock {{stockTotal[i]}}</span>
          </button>
          <button type="button" class="btn btn-primary ml-auto mr-3" :data-target="'#modelId'+i" data-toggle="modal">Details</button>
        </div>
        <div class="collapse" id="collapseExample">
          <div class="card card-body pt-0 pb-0 pr-0 pl-0">
            <table class="table">
              <thead>
                <tr style="background-color: #0062CC; color: white">
                  <th>Size</th>
                  <th>Stock</th>
                  <th></th>
                </tr>
              </thead>
              <tbody v-for="size in item.size" :key="size._id">
                <tr>
                  <td scope="row">{{ size.size }}</td>
    <!-- style="text-decoration: line-through" -->
                  <td>{{ size.stock }}</td>
                  <td>
                    <button @click="findProductOne(size._id)" :data-target="'#modeld'+i" data-toggle="modal" type="button" class="btn btn-sm btn-primary">
                      Add To Cart
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
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
              <button type="button" class="btn btn-info mx-auto">Price Rp. {{item.price}}</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
        <!-- ---- -->
        <!-- Modal -->
      <div class="modal fade" :id="'modeld'+i" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title" style="color: black; font-weight: bolder;">{{ item.name }}</h3>
              <h3 class="modal-title ml-4" style="color: black; font-weight: bolder;">
                <button type="button" class="btn btn-primary"> Size [ {{ item.size[i].size }} ]</button>
              </h3>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body p-0" v-for="(image, index) in item.image" :key="index">
              <img v-if="index == 0" :src="image" alt="" style="width:100%">
            </div>
            <div class="modal-footer" v-for="size in item.size" :key="size._id">
              <button type="button" @click="minus" class="btn m-0 btn-primary">
                <i class="fas fa-minus-circle"></i>
              </button>
              <button type="button" class="btn btn-primary m-0 focus">{{ jumlah }}</button>
              <button type="button" @click="plus" class="btn m-0 btn-primary">
                <i class="fas fa-plus-circle"></i>
              </button>
              <button type="button" class="btn btn-info mx-auto" v-if="jumlah != 0">Price Rp. {{Number(item.price) * Number(jumlah) }}</button>
              <button type="button" class="btn btn-info mx-auto" v-else>Price Rp. {{Number(item.price)}}</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="addcart(item._id,item.price)">ADD CART</button>
            </div>
          </div>
        </div>
      </div>
        <!-- ---- -->
    </div>
  </div>
</div>
</template>

<script>
import NavbarMenu from './NavbarMenu'
import { mapState } from 'vuex'
import axios from '../../apis/axios'
import Swal from 'sweetalert2'
export default {
  name: 'listItem',
  data() {
    return {
      jumlah: 0,
      maksimal: 0,
      size: 0
    }
  },
  methods: {
    findProductOne(id){
      axios({
        url : `/cart/${id}/stock`,
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data })=>{
        this.maksimal = data.cart.stock
        this.size = data.cart.size
      })
      .catch(error=>{
        console.log(error);
      })
    },
    plus(){
      if (this.jumlah < this.maksimal) {
        this.jumlah++
      }
    },
    minus(){
      if (this.jumlah != 0) {
        this.jumlah--
      }
    },
    addcart(id,price){
      Swal.showLoading()
      let form = {
        quantities: this.jumlah,
        price: Number(price) * Number(this.jumlah),
        size: this.size
      }
      axios({
        url: `/cart/${id}/cart`,
        method: 'POST',
        data : form,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data})=>{
        Swal.close()
        Swal.fire({
          title: 'Addcart Success!',
          text: '',
          icon: 'success',
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
      .catch(error=>{
        Swal.close()
        if (error.response.data.errors[0].name == 'JsonWebTokenError') {
          Swal.fire({
            title: 'Error!',
            text: 'login First',
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
        } else {
          Swal.fire({
            title: 'Error!',
            text: error.response.data.errors.join(' | ') ,
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
        }
      })
    }
  },
  created () {
    if (localStorage.getItem('email')) {
      this.$store.dispatch('getAccount')
    }
    this.$store.dispatch('getListItem')
  },
  mounted () {
    if (this.$store.state.role === 'admin') {
      this.$router.push('/admin')
    }
  },
  components : {
    'app-navbar-menu': NavbarMenu
  },
  computed: mapState(['role','listItem','stockTotal'])
}
</script>

<style scoped>

</style>
