<template>
    <div id="chart">
        <nav-bar/>
        <sui-container id="detailTransactions">
            <transactions-page/>
        </sui-container>
    </div>
</template>

<script>
    import navBar from "../components/navBar";
    import transactionsPage from "../components/transactions/transactionsPage";

    export default {
        name: 'transactions',
        components: {
            navBar,
            transactionsPage
        }
    }
</script>

<style scoped>

</style>
