<template>
    <sui-item>
        <sui-item-image
                size="tiny"
                :src="data.itemDetails.image"/>
        <div class="middle aligned content">
            <h5>
                {{ data.itemDetails.name }}
            </h5>
            <div class="description">
                <p>
                    <sui-label :color="confirmationStatus.color">{{ data.status }}</sui-label>
                    <sui-label color="yellow" v-if="confirmationStatus.descVisibility">Waiting for shiped</sui-label>
                </p>
                <p>
                    invoice : <span class="itemValue">{{ data._id }}</span><br>
                    transaction date : <span class="itemValue">{{ data.createdAt.split("T")}}</span><br>
                    Price : <span class="itemValue">Rp. {{ itemPrice }}</span><br>
                    Amount : <span class="itemValue">{{ data.itemAmount }}</span> items<br>
                    Total: <span class="itemValue">Rp. {{ totalPrice }}</span><br>
                </p>
                <sui-label id="confirm"
                           color="blue"
                           @click="confirm"
                           v-if="confirmationStatus.visibility">
                    Ship Item
                </sui-label>
            </div>
        </div>
    </sui-item>
</template>

<script>
    export default {
        name: "transactionListSells",
        props: {
            data: Object
        },
        methods: {
            price(value) {
                let segment = [];
                let n = [];
                let priceReverse = "0" + value.toString().split("").reverse().join("");
                for (let i = 1; i <= priceReverse.length + 1; i++) {
                    n.unshift(priceReverse[i])
                    if (i % 3 === 0) {
                        segment.unshift(n.join(""));
                        n = [];
                    }
                }
                return segment.join(".");
            },
            confirm() {
                this.$dialog
                    .confirm('Ship item ?')
                    .then(dialog => {
                        this.$axios({
                            method: 'patch',
                            url: `/api/transactions/shipped/${this.data._id}`,
                            headers: {token: localStorage.getItem('token')}
                        }).then(response => {
                            this.$emit('sellsTransactions');
                            this.$toast.success({
                                title: 'Success',
                                message: 'Shipped'
                            });
                            dialog.close()
                        }).catch(err => {
                            this.$toast.error({
                                title: 'Error',
                                message: 'Shipped error'
                            });
                            dialog.close()
                        })
                    })
                    .catch(err => {
                        this.$toast.info({
                            title: 'Cancel',
                            message: 'Shipped has been cancel'
                        });
                    })
            }
        },
        computed: {
            totalPrice() {
                return this.price(this.data.totalPrice)
            },
            itemPrice() {
                return this.price(this.data.itemDetails.price)
            },
            confirmationStatus() {
                if (this.data.status === 'done') {
                    return {
                        color: 'green',
                        visibility: false,
                        descVisibility: false
                    }
                } else if (this.data.status === 'paid') {
                    return {
                        color: 'teal',
                        visibility: true,
                        descVisibility: true
                    }
                } else {
                    return {
                        color: 'yellow',
                        visibility: false,
                        descVisibility: false
                    }
                }
            }
        }
    }
</script>

<style scoped>
    #confirm {
        cursor: pointer;
    }

    .itemValue {
        font-weight: bold;
    }
</style>