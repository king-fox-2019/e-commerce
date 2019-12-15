<template>
  <div class="transaction">
      <div class="list-transaction">
            <h1>Transaction List</h1>
            <br>
            <table class="table" style="overflow:scroll;max-height:600px;">
                <thead class="thead-dark" >
                    <tr> 
                        
                    <th scope="col">Transaction ID</th>
                    <th scope="col">Product</th>
                    <th scope="col">Size</th>
                    <th scope="col">Count</th>
                    <th scope="col">Price</th>
                    <th scope="col">TotalPayment</th>
                    <th scope="col">Payment Status</th>
                    <th scope="col">Receive Status</th>
                    <th scope="col">Customer - ID</th>
                    <th scope="col">Date</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody >
                    <tr v-for="(transaction, index) in allTranscation" :key="index">
                    <th style="background-color: #f6f6f6;" v-if="transaction.receive_status === true" scope="row">{{transaction._id}}</th>
                    <th v-if="transaction.receive_status === false" scope="row">{{transaction._id}}</th>

                    <th style="background-color: #f6f6f6;" v-if="transaction.receive_status === true" scope="row">{{transaction.Stock_id.productId.name.split('-')[1]}}</th>
                    <th v-if="transaction.receive_status === false" scope="row">{{transaction.Stock_id.productId.name.split('-')[1]}}</th>

                    <th style="background-color: #f6f6f6;" v-if="transaction.receive_status === true" scope="row">{{transaction.Stock_id.number}}</th>
                    <th v-if="transaction.receive_status === false" scope="row">{{transaction.Stock_id.number}}</th>

                    <th style="background-color: #f6f6f6;" v-if="transaction.receive_status === true" scope="row">{{transaction.count}}</th>
                    <th v-if="transaction.receive_status === false" scope="row">{{transaction.count}}</th>

                    <th style="background-color: #f6f6f6;" v-if="transaction.receive_status === true" scope="row">Rp.{{transaction.Stock_id.productId.price.toLocaleString()}}</th>
                    <th v-if="transaction.receive_status === false" scope="row">Rp.{{transaction.Stock_id.productId.price.toLocaleString()}}</th>

                    <th style="background-color: #f6f6f6;" v-if="transaction.receive_status === true" scope="row">Rp.{{transaction.total_payment.toLocaleString()}}</th>
                    <th v-if="transaction.receive_status === false" scope="row">Rp.{{transaction.total_payment.toLocaleString()}}</th>

                    <th scope="row" v-if="transaction.payment_status === true && transaction.receive_status === false" >Paid | <button type="button" @click="sentItem(transaction._id)" style="font-size:12px" class="btn btn-info btn-sm">Confirm</button></th>
                    <th style="background-color: #f6f6f6;" scope="row" v-if="transaction.payment_status === true && transaction.receive_status === true" >Paid | Delivered </th>
                    <th scope="row" v-if="transaction.payment_status === false" >Pending</th>

                    <th style="background-color: #f6f6f6;" scope="row" v-if="transaction.receive_status === true" >Received</th>
                    <th scope="row" v-if="transaction.receive_status === false" >Pending</th>

                    <th style="background-color: #f6f6f6;" v-if="transaction.receive_status === true" scope="row">{{transaction.User_id.fullname}}</th>
                    <th v-if="transaction.receive_status === false" scope="row">{{transaction.User_id.fullname}}</th>

                    <th style="background-color: #f6f6f6;" v-if="transaction.receive_status === true" scope="row">{{transaction.date.slice(0,10)}}</th>
                    <th v-if="transaction.receive_status === false" scope="row">{{transaction.date.slice(0,10)}}</th>

                    <th style="background-color: #f6f6f6;" v-if="transaction.receive_status === true" scope="row"><button type="button" style="font-size:12px" @click="deleteTransaction(transaction._id)" class="btn btn-danger btn-sm">Delete</button></th>
                    <th v-if="transaction.receive_status === false" scope="row"><button type="button" style="font-size:12px" class="btn btn-danger btn-sm" disabled>Delete</button></th>
                    </tr>
                </tbody>
                </table>
      </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name:'transaction-page',
    data(){
        return {
            firstName : '',
            lastName : '',
            street : '',
            city: '',
            province: '',
            postalCode: '',
            totalItems : ''
        }
    },

    methods: {
        sentItem(payload){
            this.$store.dispatch('sentItem',payload)
        },
        deleteTransaction(transactionId){
            this.$store.dispatch('deleteTransaction',transactionId)
        }
    },

    computed : mapState(['allTranscation']),

    created(){
        this.$store.dispatch('getAllTransaction')
    },

}
</script>

<style scoped>
h1{
     font-size:36px;
    font-family:'Bebas Neue';
}

th{
    font-size: 12px;
    font-weight: 200;
}
.transaction{
    display: flex;
    justify-content: center;
    align-content: center;
}
.list-transaction{
    width:80vw;
    height:80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

</style>