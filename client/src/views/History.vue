<template>
  <div class="transaction">
      <div class="list-transaction">
            <h1>Transaction History</h1>
            <br>
            <table class="table" style="overflow:scroll;min-height:300px;">
                <thead class="thead-dark" >
                    <tr> 
                        
                    <th scope="col">Transaction ID</th>
                    <th scope="col">Product</th>
                    <th scope="col">Size</th>
                    <th scope="col">Count</th>
                    <th scope="col">Price</th>
                    <th scope="col">TotalPayment</th>
                    <th scope="col">Receive Status</th>
                    <th scope="col">Receiver</th>
                    <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody >
                    <tr v-for="(transaction, index) in transactionHistory" :key="index" >
                    <th scope="row">{{transaction._id}}</th>
                    <th scope="row">{{transaction.Stock_id.productId.name}}</th>
                    <th scope="row">{{transaction.Stock_id.number}}</th>
                    <th scope="row">{{transaction.count}}</th>
                    <th scope="row">Rp.{{transaction.Stock_id.productId.price.toLocaleString()}}</th>
                    <th scope="row">Rp.{{transaction.total_payment.toLocaleString()}}</th>
                    
                    <th scope="row" v-if="transaction.receive_status === true" >Received</th>
                    <th scope="row" v-if="transaction.receive_status === false" ><button type="button" @click="confirmReceived(transaction._id)" style="font-size:12px" class="btn btn-info btn-sm">Confirm</button></th>

                    <th scope="row">{{transaction.receiver}}</th>
                    <th scope="row">{{transaction.date.slice(0,10)}}</th>
                    
                    </tr>
                </tbody>
                </table>
      </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name:'history-page',
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
        confirmReceived(transactionId){
            this.$store.dispatch('confirmReceived',transactionId)
        }
    },

    computed : mapState(['transactionHistory']),

    created(){
        this.$store.dispatch('getTransactionHistory')
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
    margin-top:150px;
    max-width:80vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

</style>