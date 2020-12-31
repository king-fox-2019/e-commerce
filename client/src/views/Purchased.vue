<template>
  <div class="container">
      <div class="row justify-content-center">
          <h1>Your Purchased Item</h1>
          <table class="table table-striped">
              <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Product ID</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Status</th>
                    <th scope="col">Done</th>
                </tr>
              </thead>
              <tbody v-for="(transaction,i) in this.listUserTransaction" :key="i">
                    <tr>
                        <td>{{i+1}}</td>
                        <td>{{transaction.productId}}</td>
                        <td>{{transaction.quantity}}</td>
                        <td>{{transaction.status}}</td>
                        <td>
                            <b-btn variant="primary" @click="done(transaction.productId,transaction.quantity)">Done</b-btn>
                        </td>
                    </tr>
              </tbody>
          </table>
      </div>
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
import axios from 'axios'

export default {
    methods: {
        ...mapActions({getUserTransactions:'transaction/getUserTransactions'}),
        done(productId,quantity){
            axios({
                method:'put',
                url:'http://35.226.212.72/transaction',
                data:{
                    productId,quantity
                },
                headers:{access_token:localStorage.getItem('access_token')}
            })
            .then(()=>{
                this.$swal({
                    type:"success",
                    title:"Done!"
                })
            })
            .catch(err=>console.log(err))
        }
    },
    computed: {
        ...mapGetters({listUserTransaction:'transaction/listUserTransaction'})
    },
    created(){
        this.getUserTransactions()
    }
}
</script>

<style>

</style>