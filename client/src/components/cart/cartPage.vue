<template>
    <sui-card-group :items-per-row="1">
        <sui-card>
            <cart-content/>
        </sui-card>
    </sui-card-group>
</template>

<script>
    import cartContent from "./cartContent";

    export default {
        name: "cartPage",
        components: {
            cartContent
        }
    }
</script>

<style scoped>

</style>