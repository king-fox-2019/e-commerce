<template>
    <sui-modal v-model="open">
        <sui-modal-header>{{ data.name }}</sui-modal-header>
        <sui-modal-content image scrolling>
            <a class="ui left red corner label">
                <i class="heart icon"></i>
            </a>
            <sui-image size="medium"
                       :src="data.image"
                       id="suiModalImage"/>
            <sui-modal-description id="suiModalDescription">
                <sui-header>Rp. {{ price }}</sui-header>
                <p>Stock available <b>{{ data.stock }}</b> items</p>
                <p>
                    <item-number @stockNumber="stockNumber"
                                 :itemStock="itemStock"/>
                </p>
                <hr class="horizontalLine">
                <p>{{ data.description }}</p>
                <hr class="horizontalLine">

                <p>
                    <sui-button content="Add to cart"
                                @click.native="addToCart"
                                v-model="itemStock"
                                :class="isItemCarted"/>
                    <router-link to="/cart">
                        <sui-button icon="shop" primary/>
                    </router-link>
                </p>
            </sui-modal-description>
        </sui-modal-content>
        <sui-modal-actions>
            <sui-button positive @click="toggle">
                OK
            </sui-button>
        </sui-modal-actions>
    </sui-modal>
</template>

<script>
    import itemNumber from "./itemNumber";
    import router from "../router";

    export default {
        name: "itemDetailModal",
        data() {
            return {
                itemStock: 1,
                userId: ""
            }
        },
        props: {
            open: Boolean,
            data: Object
        },
        methods: {
            toggle() {
                this.$emit('toggle')
            },
            viewUser() {
                if (!localStorage.getItem('token')) {
                    return
                }
                this.$store.dispatch('setCartClear');
                this.$axios({
                    method: 'get',
                    url: '/api/users/',
                    headers: {
                        token: localStorage.getItem('token')
                    }
                }).then(response => {
                    response.data.data.cart.forEach(item => {
                        this.$store.dispatch('addItemToCart', item._id);
                    });
                    this.userId = response.data.data._id
                }).catch(err => {
                    console.log(err.response)
                })
            },
            addToCart() {
                if (!localStorage.getItem('token')) {
                    router.push("/login");
                    return
                }

                this.$dialog
                    .confirm('Add item to cart ?')
                    .then(dialog => {
                        let dataCart = {
                            item: this.data._id,
                            stock: this.itemStock,
                            price: this.data.price
                        };
                        this.$store.dispatch('addItemToTempCart', dataCart);
                        this.$axios({
                            method: 'patch',
                            url: '/api/users/cart',
                            data: {cart: this.$store.getters.cartTemp},
                            headers: {token: localStorage.getItem('token')}
                        }).then(response => {
                            console.log(response.data);
                            this.$toast.success({
                                title: 'Success',
                                message: 'Item successfully add to cart'
                            });
                            dialog.close();
                        }).catch(err => {
                            console.log(err.response);
                            this.$toast.error({
                                title: 'Error',
                                // message: 'Item failed add to cart'
                                message: err.response.data.errMsg
                            });
                            dialog.close();
                        })
                    })
                    .catch(err => {
                        this.$toast.info({
                            title: 'Cancel',
                            message: 'Item cancel add to cart'
                        });
                    })
            },
            stockNumber(val) {
                if (val <= this.data.stock) this.itemStock = val
            }
        },
        computed: {
            price() {
                let segment = [];
                let n = [];
                let priceReverse = "0" + this.data.price.toString().split("").reverse().join("");
                for (let i = 1; i <= priceReverse.length + 1; i++) {
                    n.unshift(priceReverse[i])
                    if (i % 3 === 0) {
                        segment.unshift(n.join(""));
                        n = [];
                    }
                }
                return segment.join(".");
            },
            isItemCarted() {
                if (this.data.owner._id === this.userId) {
                    return "disabled"
                } else {
                    return "primary"
                }
            }
        },
        mounted() {
            this.viewUser();
        },
        components: {
            itemNumber
        }
    }
</script>

<style scoped>
    .horizontalLine {
        border: 0.3pt solid lightgray;
    }

    #suiModalDescription {
        max-height: 400px;
    }

    #suiModalImage {
        max-height: 300px;
    }
</style>