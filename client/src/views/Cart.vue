<template>
    <div id="chart">
        <nav-bar/>
        <sui-container id="detailItemContainer">
            <cart-page/>
        </sui-container>
    </div>
</template>

<script>
    import cartPage from "../components/cart/cartPage";
    import navBar from "../components/navBar";

    export default {
        name: "Cart",
        components: {
            cartPage,
            navBar
        }
    }
</script>

<style scoped>

</style>