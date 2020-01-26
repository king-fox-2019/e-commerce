<template>
    <sui-button animated="vertical" id="suiButtonShop">
        <sui-button-content hidden class="shopIcon">
            Cart
        </sui-button-content>
        <sui-button-content visible>
            <sui-icon name="shop" class="shopIcon"/>
        </sui-button-content>
    </sui-button>
</template>

<script>
    export default {
        name: "cartButton"
    }
</script>

<style scoped>
    #suiButtonShop {
        background-color: #fff;
    }

    .shopIcon {
        font-size: 16px;
        color: #3498db;
    }
</style>