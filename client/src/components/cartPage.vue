<template>
    <sui-card-group :items-per-row="1">
        <sui-card>
            <chart-content/>
        </sui-card>
    </sui-card-group>
</template>

<script>
    import chartContent from "./cartContent";

    export default {
        name: "chartPage",
        components: {
            chartContent
        }
    }
</script>

<style scoped>

</style>