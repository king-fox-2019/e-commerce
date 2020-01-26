<template>
    <sui-card-content>
        <sui-grid :columns="1">
            <sui-grid-column>
                <h1>Transactions Lists</h1>
                <sui-tab>
                    <sui-tab-pane title="Purchasing" :class="isLoading">
                        <sui-item-group divided>
                            <transaction-list
                                    v-for="(purchased,index) in purchasingData"
                                    :data="purchased"
                                    :index="index"
                                    @listTransactions="purchaseTransaction"/>
                        </sui-item-group>
                    </sui-tab-pane>
                    <sui-tab-pane title="Selling" :class="isLoading">
                        <sui-item-group divided>
                            <transaction-list-sells
                                    v-for="(sells,index) in sellsData"
                                    :data="sells"
                                    :index="index"
                                    @sellsTransactions="sellsTransaction"/>
                        </sui-item-group>
                    </sui-tab-pane>
                </sui-tab>
            </sui-grid-column>
        </sui-grid>
    </sui-card-content>
</template>

<script>
    import transactionList from "./transactionList";
    import transactionListSells from "./transactionListSells";

    export default {
        name: "transactionsContent",
        data() {
            return {
                purchasingData: [],
                sellsData: [],
                isLoading: 'loading'
            }
        },
        methods: {
            purchaseTransaction() {
                this.$axios({
                    method: 'get',
                    url: '/api/transactions/purchased',
                    headers: {
                        token: localStorage.getItem('token')
                    }
                }).then(response => {
                    this.purchasingData = response.data.data;
                    this.isLoading = false
                }).catch(err => {
                    console.log({err})
                })
            },
            sellsTransaction() {
                this.$axios({
                    method: 'get',
                    url: '/api/transactions/sells',
                    headers: {
                        token: localStorage.getItem('token')
                    }
                }).then(response => {
                    this.sellsData = response.data.data;
                    this.isLoading = false
                }).catch(err => {
                    console.log({err})
                })
            }
        },
        mounted() {
            this.purchaseTransaction();
            this.sellsTransaction()
        },
        components: {
            transactionList,
            transactionListSells
        }
    }
</script>

<style scoped>

</style>