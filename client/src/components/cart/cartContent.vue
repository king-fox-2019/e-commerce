<template>
    <sui-card-content>
        <sui-grid :columns="1">
            <sui-grid-column>
                <h1>Cart Items</h1>
                Total Item : <strong>{{ carts.length }}</strong> items<br>
                Total : Rp. <strong>{{ sumTotalPrice }}</strong>
                <sui-item-group divided>
                    <cart-list
                            v-for="(cart,index) in carts"
                            :data="cart"
                            :index="index"
                            @checkout="checkout"
                            @remove="removeFromCart"/>
                </sui-item-group>
            </sui-grid-column>
        </sui-grid>
    </sui-card-content>
</template>

<script>
    import cartList from "./cartList";

    export default {
        name: "cartContent",
        data() {
            return {
                carts: []
            }
        },
        methods: {
            listOfCart() {
                this.$axios({
                    method: 'get',
                    url: '/api/users',
                    headers: {
                        token: localStorage.getItem('token')
                    }
                }).then(response => {
                    this.carts = response.data.data.cart;
                }).catch(err => {
                    console.log(err.response)
                })
            },
            removeFromCart(id) {
                this.$dialog
                    .confirm("Remove item from cart ?")
                    .then(dialog => {
                        this.$axios({
                            method: 'delete',
                            url: `/api/users/cart/${id}`,
                            headers: {
                                token: localStorage.getItem('token')
                            }
                        }).then(response => {
                            console.log(response.data);
                            this.listOfCart();
                            this.$toast.success({
                                title: 'Success',
                                message: 'Item successfully removed from shopping cart'
                            });
                            dialog.close();
                        }).catch(err => {
                            console.log(err.response);
                            this.$toast.error({
                                title: 'Error',
                                message: 'Item failed to remove from cart'
                            });
                            dialog.close();
                        })
                    })
                    .catch(err => {
                        this.$toast.info({
                            title: 'Cancel',
                            message: 'Canceled remove the item from cart'
                        });
                    })
            },
            checkout(data) {
                this.$dialog
                    .confirm("Checkout item from cart ?")
                    .then(dialog => {
                        this.$axios({
                            method: 'post',
                            url: '/api/transactions/checkout',
                            data: {data: data},
                            headers: {
                                token: localStorage.getItem('token')
                            }
                        }).then(response => {
                            console.log({response});
                            this.listOfCart();
                            this.$toast.info({
                                title: 'Cancel',
                                message: response.data.message
                            });
                            dialog.close();
                        }).catch(err => {
                            console.log(err.response);
                            this.$toast.error({
                                title: 'Error',
                                message: err.response.data.errMsg
                            });
                            dialog.close();
                        });
                    })
                    .catch(err => {
                        this.$toast.info({
                            title: 'Cancel',
                            message: 'Canceled checkout the item from cart'
                        });
                    })
            }
        },
        mounted() {
            this.listOfCart();
        },
        computed: {
            sumTotalPrice() {
                let totalPrice = 0;

                this.carts.forEach(cart => {
                    totalPrice += cart.totalPrice
                });

                this.$store.dispatch('currencyFormat', totalPrice);
                return this.$store.getters.currency
            }
        },
        components: {
            cartList
        }
    }
</script>

<style scoped>

</style>