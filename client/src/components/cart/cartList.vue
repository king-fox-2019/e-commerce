<template>
    <sui-item>
        <sui-item-image
                size="tiny"
                :src="data.item.image"/>
        <div class="middle aligned content">
            <h5>
                {{ data.item.name }}
            </h5>
            <div class="description">
                <p>
                    Price : Rp. {{ itemPrice }}<br>
                    Amount : {{ data.stock }} item<br>
                    Total: Rp. {{ totalPrice }}
                </p>
            </div>
            <div class="extra">
                <sui-button icon="check" basic primary @click="checkout"/>
                <sui-button icon="remove" basic negative @click="removeFromCart"/>
            </div>
        </div>
    </sui-item>
</template>

<script>
    export default {
        name: "chartList",
        props: {
            data: Object
        },
        methods: {
            removeFromCart() {
                this.$emit('remove', this.data._id)
            },
            checkout(){
                this.$emit('checkout', this.data)
            }
        },
        computed: {
            totalPrice() {
                this.$store.dispatch('currencyFormat', this.data.totalPrice);
                return this.$store.getters.currency
            },
            itemPrice() {
                this.$store.dispatch('currencyFormat', this.data.item.price);
                return this.$store.getters.currency
            },
        },
    }
</script>

<style scoped>

</style>