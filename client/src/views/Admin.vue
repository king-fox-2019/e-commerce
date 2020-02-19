<template>
<div>
    <div class="row">
        <div class="col-2 pr-0" style="border-right: 1px solid #E5E5E5; height: 94vh;">
            <div class="pt-3 pb-3 logogif" style="height:auto; text-align: center;">
                <img src="../assets/Navbar-Mark.png" class="" style="width:100px;" alt="">
            </div>
            <button type="button" class="btn btn-block buttonOptions mt-3" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                <i class="fas fa-shopping-cart"></i>
                Options Products
            </button>
            <div class="collapse" id="collapseExample">
                <div class="card card-body p-0 py-2 px-2">
                    <button type="button" class="btn btn-primary" @click.prevent="$router.push('/admin/sellproduct')">Sell Product</button>
                    <button type="button" class="btn btn-primary mt-1" @click.prevent="$router.push('/admin/listproduct')">List Product</button>
                </div>
            </div>
            <button type="button" class="btn btn-block buttonOptions mt-0" data-toggle="collapse" data-target="#collapseExample1" aria-expanded="false" aria-controls="collapseExample1">
                <i class="fas fa-user-alt"></i>
                Options Members
            </button>
            <div class="collapse" id="collapseExample1">
                <div class="card card-body p-0 py-2 px-2">
                    <button type="button" class="btn btn-primary" @click.prevent="$router.push('/admin/member')">List Member</button>
                </div>
            </div>
            <button type="button" class="btn btn-block buttonOptions mt-0" data-toggle="collapse" data-target="#collapseExample2" aria-expanded="false" aria-controls="collapseExample2">
                <i class="fas fa-bell"></i>
                Notifications
            </button>
            <div class="collapse" id="collapseExample2">
                <div class="card card-body p-0 py-2 px-2">
                    <button type="button" class="btn btn-primary" @click.prevent="$router.push('/admin/checkout')">Checkout Product</button>
                    <button type="button" class="btn btn-primary mt-1" @click.prevent="$router.push('/admin/history')">History Product</button>
                </div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</div>
</template>

<script>
import axios from '../../apis/axios'
import { mapState } from 'vuex'
import Swal from 'sweetalert2'

export default {
  data () {
    return {
    }
  },
  created () {
  },
  components: {
  },
  computed: mapState(['isLogin'])
}
</script>

<style scoped>
*{
    overflow-x: hidden;
    overflow-y: hidden;
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
    background: url('../assets/adidasBubble.gif');
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
