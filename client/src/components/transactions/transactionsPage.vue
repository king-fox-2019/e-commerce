<template>
    <sui-card-group :items-per-row="1">
        <sui-card>
            <transactions-content/>
        </sui-card>
    </sui-card-group>
</template>

<script>
    import transactionsContent from "./transactionsContent";

    export default {
        name: "transactionsPage",
        components: {
            transactionsContent
        }
    }
</script>

<style scoped>

</style>