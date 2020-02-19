<template>
<div class="row">
    <div class="col-12 col-lg-12">
        <div class="cart-title mt-50">
            <h2>Transaction list</h2>
        </div>
        <div class="cart-table clearfix">
            <table class="table table-responsive">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>product list</th>
                        <th>Total Price</th>
                        <th>status</th>
                    </tr>
                </thead>
                <tbody>
                <tr v-for="(transaction, id) in transactions" :key="id">
                    <td class="cart_transaction_desc">
                        <h5>{{transaction.date}}</h5>
                    </td>
                    <td class="qty" >
                        <div v-for="(product, id) in transaction.shopList" :key="id" class="qty-btn d-flex">
                            <p>{{product.product.name}}</p>
                            <p>x{{product.amount}}</p>
                            
                        </div>
                    </td>
                    <td class="price">
                        <span>Rp. {{transaction.total}}</span>
                    </td>
                    <td class="price">
                        <span>{{transaction.status}} </span>
                        <span v-if="transaction.status != 'completed'"><a @click="barangSampe(transaction._id)" class="btn btn-info" role="button">Barang sampai</a></span>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    name:'transaction',
    data(){
        return{
            transactions : []
        }
    },
    methods:{
        fetchTransaction(){
            axios({
                url:'http://localhost:3000/transaction/user',
                method : 'get',
                headers:{
                    access_token : localStorage.access_token
                }
            }).then(({data}) => {
                this.transactions = data
            }).catch(console.log)
        },
        barangSampe(id){
            axios({
                url:`http://localhost:3000/transaction/${id}`,
                method : 'patch',
                data:{
                    status : 'completed'
                },
                headers:{
                    access_token : localStorage.access_token
                }
            }).then(({data}) => {
                swal({
                    title: "Thank you!",
                    icon: "success",
                    });
                this.fetchTransaction()
            }).catch(console.log)
        }
    },
    created(){
        this.fetchTransaction()
    }
}
</script>

<style scoped>
    
</style>