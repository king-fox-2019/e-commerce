<template>
    <sui-card-content>
        <sui-grid :columns="1">
            <sui-grid-column>
                <h1>Chart Items</h1>
                Total Item : <strong>{{ carts.length }}</strong> items<br>
                Total : Rp. <strong>{{ sumTotalPrice }}</strong>
                <sui-item-group divided>
                    <chart-list
                            v-for="(cart,index) in carts"
                            :data="cart"
                            :index="index"
                            @remove="removeFromCart"/>
                </sui-item-group>
            </sui-grid-column>
        </sui-grid>
    </sui-card-content>
</template>

<script>
    import chartList from "./cartList";

    export default {
        name: "chartContent",
        data() {
            return {
                carts: []
            }
        },
        methods: {
            listOfChart() {
                this.$axios({
                    method: 'get',
                    url: '/api/user',
                    headers: {
                        token: localStorage.getItem('token')
                    }
                }).then(response => {
                    this.carts = response.data.data.cart
                }).catch(err => {
                    console.log(err.response)
                })
            },
            price(num) {
                let segment = [];
                let n = [];
                let priceReverse = "0" + num.toString().split("").reverse().join("");
                for (let i = 1; i <= priceReverse.length + 1; i++) {
                    n.unshift(priceReverse[i])
                    if (i % 3 === 0) {
                        segment.unshift(n.join(""));
                        n = [];
                    }
                }
                return segment.join(".");
            },
            removeFromCart(index) {
                this.carts.splice(index, 1);
                this.$axios({
                    method: 'patch',
                    url: '/api/user/cart',
                    data: {
                        cart: this.carts
                    },
                    headers: {
                        token: localStorage.getItem('token')
                    }
                }).then(response => {
                    console.log(response.data)
                }).catch(err => {
                    console.log(err.response)
                })
            }
        },
        mounted() {
            this.listOfChart();
        },
        computed: {
            sumTotalPrice() {
                let prices = [];
                let totalPrice = 0;

                this.carts.forEach(cart => {
                    prices.push(cart.price)
                });

                prices.forEach(price => {
                    totalPrice += price
                });

                return this.price(totalPrice);
            }
        },
        components: {
            chartList
        }
    }
</script>

<style scoped>

</style>