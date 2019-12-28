<template>
    <sui-button animated="vertical" id="suiButtonShop">
        <sui-button-content hidden class="shopIcon">
            Chart
        </sui-button-content>
        <sui-button-content visible>
            <sui-icon name="shop" class="shopIcon"/>
        </sui-button-content>
    </sui-button>
</template>

<script>
    export default {
        name: "chartButton"
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