<template>
<div>
    <div class="row">
        <div class="col-2 pr-0" style="border-right: 1px solid #E5E5E5; height: 94vh;">
            <div class="pt-3 pb-3 logogif" style="height:auto; text-align: center;">
                <img :src="image" class="" style="width:100px;" alt="">
            <span class="text-center" style="font-size: 22px; font-weight: bold">{{ name }}</span> <br>
            <span class="text-center mt-2">
                <i class="fas fa-money-bill mt-2"></i>
                Rp.{{ money }}
            </span>
            </div>
            <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modelIda">
                <i class="fas fa-money-check"></i>
                TopUp
            </button>
            <!-- Modal -->
            <div class="modal fade" id="modelIda" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Modal title</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group container">
                              <label for=""></label>
                              <small id="helpId" class="form-text text-muted">TOP UP</small>
                              <input type="number" v-model="moneytopup"
                                class="form-control text-center" name="" id="" aria-describedby="helpId" placeholder="">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="TopUp">TOP UP</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- --------- -->
            <button type="button" class="btn btn-block buttonOptions mt-3" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                <i class="fas fa-shopping-cart"></i>
                My Cart
            </button>
            <div class="collapse" id="collapseExample">
                <div class="card card-body p-0 py-2 px-2">
                    <button type="button" class="btn btn-primary" @click.prevent="$router.push('/customer/listcart')">Cart</button>
                    <button type="button" class="btn btn-primary mt-1" @click.prevent="$router.push('/customer/history')">History</button>
                </div>
            </div>
            <button type="button" class="btn btn-block buttonOptions mt-0" data-toggle="collapse" data-target="#collapseExample1" aria-expanded="false" aria-controls="collapseExample1">
                <i class="fas fa-user-alt"></i>
                Options
            </button>
            <div class="collapse" id="collapseExample1">
                <div class="card card-body p-0 py-2 px-2">
                    <button type="button" class="btn btn-primary" @click.prevent="$router.push('/admin/member')">Transfer Dana</button>
                </div>
            </div>
            <button type="button" class="btn btn-block buttonOptions mt-0">
                <i class="fas fa-bell"></i>
                Notifications
            </button>
        </div>
        <div class="col pl-0">
        <nav class="navbar py-3 navbar-expand-sm navbar-dark navbar-member">
            <a class="navbar-brand d-flex flex-row" href="#">
                <img src="../assets/GitHub-Mark.png" alt="img" style="width:100px;">
                <div class="d-flex align-items-center ml-auto">
                    <h1 class="px-5 py-2" style="background-color: #c46607;"><strong> SPORTSTATION </strong></h1>
                </div>
            </a>
            <div class="collapse navbar-collapse" id="collapsibleNavId">
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0"> </ul>
                <form class="form-inline my-2 my-lg-0">
                    <input class="form-control py-4 mr-sm-2" type="text" placeholder="Search Product">
                </form>
            </div>
        </nav>
        <router-view></router-view>
    </div>
    </div>
</div>
</template>

<script>
import axios from '../../apis/axios'
import { mapState } from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: 'customer',
  data () {
    return {
        moneytopup: 0
    }
  },
  methods: {
      TopUp(id){
          axios({
          url : `user/money/topup`,
          method: 'PATCH',
          data: {
              money: this.moneytopup
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data })=>{
          console.log(data);
            Swal.fire({
            title: 'TopUp Success!',
            text: '',
            icon: 'success',
            // imageWidth: 400,
            // imageHeight: 200,
            timer: 1500,
            imageAlt: 'Custom image',
            showConfirmButton: false,
            showCancelButton: false,
            confirmButtonText: 'نعم',
            cancelButtonText: 'لا'
          })
            this.$store.dispatch('getAccount')
            this.$route.push('/customer')
        })
        .catch(error=>{
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
      }
  },
  created () {
  },
  components: {
  },
  computed: mapState(['isLogin','image','name','money'])
}
</script>

<style scoped>
*{
    overflow-x: hidden;
    overflow-y: hidden;
}

.navbar-member{
    background: url('../assets/nikeBubble.gif')
}

.imgHover:hover{
    cursor: pointer;
    border: 4px solid rgba(68, 68, 68, 0.295);
}
.selectProductPrice{
    width: 1rem;
}
.selectProductPrice:focus{
    box-shadow: none;
}

.selectProductNumber{
    width: 12rem;
}
.selectProductNumber:focus{
    box-shadow: none;
}
.selectProduct{
    width: 9rem;
}
.selectProduct:focus{
    box-shadow: none;
}

.inputProduct{
    width: 30rem;
    font-weight: bolder;
}
.inputProduct:focus{
    box-shadow: none;
}

.logogif{
    background-color: rgba(255, 251, 251, 0.548);
    cursor: pointer;
    transition: 0.5s;
}
.logogif:hover{
    background-color: rgba(129, 129, 129, 0.548);
}

.buttonOptions{
    background-color: rgb(255, 255, 255);
    color: rgb(139, 139, 139);
}
.buttonOptions:hover{
    background-color: rgb(255, 255, 255);
    color: black;
}
.buttonOptions:focus{
    box-shadow: none;
}
</style>
