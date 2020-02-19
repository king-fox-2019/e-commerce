<template>
<div class="row">
    <div class="col-12 col-lg-8">
        <div class="cart-title mt-50">
            <h2>Shopping Cart</h2>
        </div>
        <div class="cart-table clearfix">
            <table class="table table-responsive">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(product, id) in this.$store.state.userCart" :key="id">
                        <td class="cart_product_img">
                            <a href="#"><img :src="product.product.image" alt="Product"></a>
                        </td>
                        <td class="cart_product_desc">
                            <h5>{{product.product.name}}</h5>
                        </td>
                        <td class="price">
                            <span>Rp. {{product.product.price}}</span>
                        </td>
                        <td class="qty" >
                            <div class="qty-btn d-flex">
                                <p>Qty</p>
                                <div class="quantity">
                                    <span class="qty-minus" @click="decreaseCart(product.product._id)"><i class="fa fa-minus" aria-hidden="true"></i></span>
                                    <input type="number" :id="product.product._id" class="qty-text" step="1" min="1" max="300" name="quantity" :value="product.amount" readonly>
                                    <span class="qty-plus" @click="increaseCart(product.product._id, product.product.stock)"><i class="fa fa-plus" aria-hidden="true"></i></span>
                                </div>
                                <p><a><span @click="deleteCart(product.product._id)"><i class="fa fa-trash" aria-hidden="true"></i></span></a></p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="col-12 col-lg-4">
        <div class="cart-summary">
            <h5>Cart Total</h5>
            <ul class="summary-table">
                <li><span>subtotal:</span> <span>Rp.{{getTotal}}</span></li>
                <li><span>delivery:</span> <span>Free</span></li>
                <li><span>total:</span> <span>Rp.{{getTotal}}</span></li>
            </ul>

            <div class="payment-method">
                <!-- Cash on delivery -->
                <div class="custom-control custom-checkbox mr-sm-2">
                    <input type="checkbox" class="custom-control-input" id="cod" checked>
                    <label class="custom-control-label" for="cod">Cash on Delivery</label>
                </div>
                <!-- Paypal -->
                <div class="custom-control custom-checkbox mr-sm-2">
                    <input type="checkbox" class="custom-control-input" id="paypal">
                    <label class="custom-control-label" for="paypal">Paypal <img class="ml-15" src="../assets/img/core-img/paypal.png" alt=""></label>
                </div>
            </div>

            <div class="cart-btn mt-100">
                <a href="#" v-show="this.$store.state.userCart.length" @click="checkout" class="btn amado-btn w-100">Checkout</a>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'cartComponent',
    created(){
        this.$store.dispatch('fetchCart')
    },
    methods:{
        decreaseCart(id){
            var effect = document.getElementById(id); 
            var qty = effect.value; 
            if( !isNaN( qty ) && qty > 1 ){
                effect.value--
                axios({
                    url:'http://localhost:3000/user/decrease',
                    method:'put',
                    data:{
                        product : id
                    },
                    headers:{
                        access_token : localStorage.access_token
                    }
                }).then(({data}) => {
                    this.$store.dispatch('fetchCart')
                }).catch(console.log)
            } 
        },
        increaseCart(id, stock){
            var effect = document.getElementById(id); 
            var qty = effect.value; 
            if( !isNaN( qty ) && qty < stock) {
                axios({
                    url:'http://localhost:3000/user',
                    method:'put',
                    data:{
                        product : id,
                        amount : 1
                    },
                    headers:{
                        access_token : localStorage.access_token
                    }
                }).then(({data}) => {
                    this.$store.dispatch('fetchCart')
                }).catch(console.log)
            }
        },
        deleteCart(id){
            axios({
                    url:'http://localhost:3000/user/remove-cart',
                    method:'put',
                    data:{
                        product : id
                    },
                    headers:{
                        access_token : localStorage.access_token
                    }
                }).then(({data}) => {
                    this.$store.dispatch('fetchCart')
                }).catch(console.log)
        },
        checkout(){
            axios({
                url:'http://localhost:3000/transaction/',
                method: 'post',
                data:{
                    total : this.getTotal,
                    shopList : this.$store.state.userCart
                },
                headers:{
                    access_token : localStorage.access_token
                }
            })
                .then(({data}) => {
                    return axios({
                        url:'http://localhost:3000/user/empty',
                        method: 'patch',
                        headers:{
                            access_token : localStorage.access_token
                        }
                    })
                })
                .then(({data}) => {
                    this.$store.dispatch('fetchCart')
                    swal({
                    title: "Transaction Complete!",
                    text: "check your transaction in transaction tab",
                    icon: "success",
                    });
                })
                .catch(console.log)
        },
        dateNow(){

        }
    },
    computed : {
        getTotal(){
            let cart = this.$store.state.userCart
            let total = 0;
            cart.forEach(element => {
                total += element.amount * element.product.price
            });
            return total
        },
    }
}
</script>

<style>

</style>