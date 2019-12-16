<template>
    <div id="chart">
        <nav-bar/>
        <sui-container id="detailItemContainer">
            <chart-page/>
        </sui-container>
    </div>
</template>

<script>
    import chartPage from "../components/cartPage";
    import navBar from "../components/navBar";

    export default {
        name: "Chart",
        components: {
            chartPage,
            navBar
        }
    }
</script>

<style scoped>
    #detailItemContainer {
        padding: 25px;
    }
</style>