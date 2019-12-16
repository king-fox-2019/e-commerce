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
                    <item-number/>
                </p>
                <hr class="horizontalLine">
                <p>{{ data.description }}</p>
                <hr class="horizontalLine">
                <p>
                    <sui-button content="Add to chart"
                                @click="addToCart"
                                :class="isItemCarted"/>
                    <router-link to="/chart">
                        <sui-button icon="shop" primary/>
                    </router-link>
                </p>
            </sui-modal-description>
        </sui-modal-content image scrolling>
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
                carts: []
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
                this.$axios({
                    method: 'get',
                    url: '/api/user/',
                    headers: {
                        token: localStorage.getItem('token')
                    }
                }).then(response => {
                    // console.log(response.data.data.cart);
                    response.data.data.cart.forEach(item => {
                        this.carts.push(item._id)
                    })
                }).catch(err => {
                    console.log(err.response)
                })
            },
            addToCart() {
                if (!localStorage.getItem('token')) {
                    router.push("/login");
                    return
                }

                this.carts.push(this.data._id);
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
                let n = this.carts.indexOf(this.data._id);
                if (n >= 0) {
                    return "disabled"
                } else {
                    return "primary"
                }
            }
        },
        mounted() {
            this.cart = this.data.cart;
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