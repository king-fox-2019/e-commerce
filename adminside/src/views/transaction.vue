<template>
<div class="main-panel">
  <div class="container-fluid">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header card-header-primary">
          <h4 class="card-title ">Transaction List</h4>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table">
              <thead class=" text-primary">
                <tr>
                    <th>Date</th>
                    <th>User</th>
                    <th>product list</th>
                    <th>Total Price</th>
                    <th>status</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(transaction, id) in transactions" :key="id">
                    <td>
                        <h5>{{transaction.date}}</h5>
                    </td>
                    <td>
                        <p>{{transaction.user.name}}</p>
                    </td>
                    <td>
                        <div v-for="(product, id) in transaction.shopList" :key="id">
                            <p>{{product.product.name}} x{{product.amount}}</p>
                        </div>
                    </td>
                    <td>
                        <span>Rp. {{transaction.total}}</span>
                    </td>
                    <td>
                        <span>{{transaction.status}} </span>
                    </td>
                </tr>
                </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'
import axios from 'axios'
export default {
  name: 'home',
  data(){
    return{
      transactions:[],
    }
  },
  methods:{
    fetchProduct(){
      axios({
        url:'http://localhost:3000/transaction',
        method:'get',
        headers:{
          access_token : localStorage.access_token
        }
      })
        .then(({data}) => {
          this.transactions = data
        })
        .catch(console.log)
    },
  },
  created(){
    this.fetchProduct()
  }
}
</script>
